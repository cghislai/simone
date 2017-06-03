import {Component, Input, NgZone, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DockerContainersService} from '../../services/docker-containers.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {LogFilter} from './log-filter';
import {LogLine, Stream} from './log-line';
import {Subscription} from 'rxjs/Subscription';
import {DemuxedStream} from '../../client/domain/demuxedStream';

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

  private source = new BehaviorSubject<LogLine[]>([]);
  private lineBufferLength: number = 1000;
  private connectionSubscription: Subscription;
  private messageSubscription: Subscription;

  connected = new BehaviorSubject<boolean>(false);
  connecting: boolean;
  filter: LogFilter;
  data: Observable<LogLine[]>;
  streams = Stream;
  linesBuffer: number = 500;

  constructor(private containerService: DockerContainersService,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.filter = {
      stdIn: false, stdOut: true, stdErr: true,
    };
    this.data = this.source.asObservable().share();
    this.initConnection();

    // Keep following logs
    this.source.debounceTime(100)
      .subscribe(data => this.updateHash());
  }

  ngOnDestroy() {
    if (this.messageSubscription != null) {
      this.messageSubscription.unsubscribe();
    }
    if (this.connectionSubscription != null) {
      this.connectionSubscription.unsubscribe();
    }
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

  private initConnection() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.clear();
    this.connected.next(false);
    this.connecting = true;
    this.connectionSubscription = this.containerService.logs(this.containerId, {
      stderr: this.filter.stdErr,
      stdout: this.filter.stdOut,
      stdin: this.filter.stdIn,
      logs: true,
      stream: true,
      detachKeys: null,
    })
      .subscribe(stream => {
          this.connected.next(true);
          this.subscribeStream(stream);
        },
        error => this.connected.next(false),
        () => this.connecting = false,
      );
  }

  private subscribeStream(stream: DemuxedStream) {
    this.connectionSubscription = null;
    this.messageSubscription = stream.out
      .map(msg => <LogLine>{stream: Stream.OUT, data: msg})
      .subscribe(line => {
        this.appendLine(line);
      });
  }

  private appendLine(line: LogLine) {
    let curLines = this.source.getValue();
    let curLinesToKeep = Math.min(curLines.length, this.linesBuffer - 1);
    let curLinesStart = curLines.length - curLinesToKeep;
    let newLines = [...curLines.slice(curLinesStart, curLines.length), line];
    this.source.next(newLines);
  }
}
