import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {DockerContainersService} from '../../services/docker-containers.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {ContainerStats} from '../../../client/domain/container-stats';

@Component({
  selector: 'app-container-stats',
  templateUrl: './container-stats.component.html',
  styleUrls: ['./container-stats.component.scss'],
})
export class ContainerStatsComponent implements OnInit, OnDestroy {

  @Input()
  private containerId: string;

  private stream: NodeJS.ReadableStream;
  private closeListener: Function;
  private dataListener: Function;

  private source = new BehaviorSubject<ContainerStats>(null);
  private connectionSubscription: Subscription;
  connected = new BehaviorSubject<boolean>(false);
  connecting: boolean;
  data: Observable<ContainerStats>;

  constructor(private containerService: DockerContainersService,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.data = this.source.asObservable().share();
    this.initConnection();
  }

  ngOnDestroy() {
    this.unsubscribeStream();
  }


  cancelConnection() {
    if (this.connectionSubscription != null) {
      this.connectionSubscription.unsubscribe();
    }
  }

  private parseStream(data: Uint8Array) {
    let stringData = '';
    for (var i = 0; i < data.length; i++) {
      stringData += String.fromCharCode(data[i]);
    }
    let statsData: ContainerStats = JSON.parse(stringData);
    this.source.next(statsData);
  }

  private unsubscribeStream() {
    this.connected.next(false);
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
    this.connectionSubscription = this.containerService.stats(this.containerId, {
      stream: true,
    }).subscribe(stream => this.listenStream(stream),
      error => this.connected.next(false),
      () => this.connecting = false);
  }

}
