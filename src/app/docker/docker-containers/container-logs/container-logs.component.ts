import {Component, Input, NgZone, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DockerContainersService} from '../../services/docker-containers.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {LogFilter} from './log-filter';
import {LogLine, Stream} from './log-line';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-container-logs',
  templateUrl: './container-logs.component.html',
  styleUrls: ['./container-logs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContainerLogsComponent implements OnInit, OnDestroy {

  @Input()
  containerId: string;
  @Input()
  tty: boolean;

  private stream: NodeJS.ReadableStream;
  private dataListener: Function;
  private closeListener: Function;

  private source = new BehaviorSubject<LogLine[]>([]);
  private lineBufferLength: number = 1000;
  private connectionSubscription: Subscription;

  connected = new BehaviorSubject<boolean>(false);
  connecting: boolean;
  filter: LogFilter;
  data: Observable<LogLine[]>;
  streams = Stream;
  linesBuffer: number = 1000;
  unHandledBytes: Uint8Array;

  constructor(private containerService: DockerContainersService,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.filter = {
      stdIn: false, stdOut: true, stdErr: true,
    };
    this.data = this.source.asObservable().share();
    this.unHandledBytes = null;
    this.initConnection();

    // Keep following logs
    this.source.debounceTime(100)
      .subscribe(data => this.updateHash());
  }

  ngOnDestroy() {
    this.unsubscribeStream();
  }

  onFilterStdInChange(value: boolean) {
    this.filter.stdIn = value;
    this.initConnection();
  }

  onFilterStdOutChange(value: boolean) {
    this.filter.stdOut = value;
    this.initConnection();
  }

  onFilterStdErrChange(value: boolean) {
    this.filter.stdErr = value;
    this.initConnection();
  }

  onLinesBufferChange(event) {
    this.lineBufferLength = this.linesBuffer;
    let curLines = this.source.getValue();
    let max = Math.min(curLines.length, this.lineBufferLength);
    let newLines = curLines.slice(0, max);
    this.source.next(newLines);
  }

  clear() {
    this.source.next([]);
  }

  goto(hash: string) {
    window.location.hash = '';
    window.location.hash = hash;
  }

  isFollowing(): boolean {
    let hash = window.location.hash;
    return hash === '#last-log-line';
  }

  cancelConnection() {
    if (this.connectionSubscription != null) {
      this.connectionSubscription.unsubscribe();
    }
  }

  private updateHash() {
    if (this.isFollowing()) {
      let hash = window.location.hash;
      this.goto(hash);
    }
  }

  private parseStream(data: Uint8Array) {
    let newLines: LogLine[] = [];
    let curIndex = 0;
    let unhandledBytesCount = this.unHandledBytes == null ? 0 : this.unHandledBytes.length;
    let buffer = new Uint8Array(unhandledBytesCount + data.length);
    for (var i = 0; i < unhandledBytesCount; i++) {
      buffer[i] = this.unHandledBytes[i];
    }
    for (var i = 0; i < data.length; i++) {
      buffer[unhandledBytesCount + i] = data[i];
    }
    this.unHandledBytes = null;

    while (buffer.length > curIndex) {
      let lineData = this.readLogLine(buffer, curIndex);
      if (lineData.line == null) {
        this.unHandledBytes = buffer.slice(curIndex);
        break;
      }

      newLines.push(lineData.line);
      curIndex = lineData.index;
    }

    let oldLines = this.source.getValue();
    let linesToKeep = this.lineBufferLength - newLines.length;
    if (linesToKeep <= 0) {
      let max = Math.min(this.lineBufferLength, newLines.length);
      let min = newLines.length - max;
      let lines = newLines.slice(min, max);
      this.source.next(lines);
    } else {
      let max = oldLines.length;
      let min = Math.max(oldLines.length - linesToKeep, 0);
      let lines = oldLines.slice(min, max);
      this.source.next([...lines, ...newLines]);
    }
  }

  private unsubscribeStream() {
    this.connected.next(false);
    this.clear();
    if (this.stream != null && this.dataListener != null) {
      console.log('logs unsubscribing');
      this.stream.removeListener('data', this.dataListener);
      this.stream = null;
      this.dataListener = null;
    }
  }

  private listenStream(stream: NodeJS.ReadableStream) {
    this.unsubscribeStream();
    this.connected.next(true);
    this.stream = stream;
    this.dataListener = (data: Uint8Array) => this.zone.runGuarded(() => this.parseStream(data));
    this.closeListener = () => this.zone.runGuarded(() => this.onStreamClosed());
    this.stream.addListener('data', this.dataListener);
    this.stream.addListener('close', this.closeListener)
  }

  private onStreamClosed() {
    this.unsubscribeStream();
    this.initConnection();
  }

  private initConnection() {
    this.unsubscribeStream();
    this.connecting = true;
    this.connectionSubscription = this.containerService.logs(this.containerId, {
      follow: true,
      stdout: this.filter.stdOut,
      stderr: this.filter.stdErr,
      tail: this.lineBufferLength,
    }).subscribe(stream => this.listenStream(stream),
      error => this.connected.next(false),
      () => this.connecting = false);
  }

  private readLogLine(buffer: Uint8Array, index: number): { line: LogLine, index: number } {
    if (buffer.length < index + 8) {
      return {line: null, index: index};
    }
    if (!this.tty) {
      let header = buffer.slice(index, index + 8);
      let size: number = 0;
      size = size + ((header[4] << 24) & 0xff000000);
      size = size + ((header[5] << 16) & 0x00ff0000);
      size = size + ((header[6] << 8) & 0x0000ff00);
      size = size + ((header[7] << 0) & 0x000000ff);
      // if (header[6] != 0) {
      //   console.log('=============');
      //   console.log(header[4]);
      //   console.log(header[5]);
      //   console.log(header[6]);
      //   console.log(header[7]);
      //   console.log('++++++');
      //   console.log(header[6] << 8);
      //   console.log(((header[6] << 8) & 0x0000ff00));
      //   console.log(size);
      // }
      if (header[1] != 0) {
        console.error('Invalid header');
        console.log(buffer);
        throw 'Invalid header';
      }
      if (buffer.length < index + 8 + size) {
        return {line: null, index: index};
      }

      let rowData = buffer.slice(index + 8, index + 8 + size);
      let newIndex = index + 8 + size;

      let typeBit = header[0];
      let typeValue: Stream;
      switch (typeBit) {
        case 0:
          typeValue = Stream.IN;
          break;
        case 1:
          typeValue = Stream.OUT;
          break;
        case 2:
          typeValue = Stream.ERR;
          break;
      }
      let rowValue = '';
      rowData.forEach(byte => rowValue += String.fromCharCode(byte));
      let line: LogLine = {
        stream: typeValue,
        data: rowValue,
      };
      return {line: line, index: newIndex};
    } else {
      let nextNewLine = buffer.indexOf('\n'.charCodeAt(0), index);
      if (nextNewLine >= index && nextNewLine < buffer.length) {
        let lineValue = '';
        buffer.slice(index, nextNewLine)
          .forEach(byte => lineValue += String.fromCharCode(byte));
        return {
          line: {stream: Stream.OUT, data: lineValue},
          index: nextNewLine,
        };
      } else {
        return {line: null, index: index};
      }
    }

  }

}
