import {DockerClient} from '../client/docker.client';
import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {DockerOptionsService} from './docker-options.service';
import {Subject} from 'rxjs/Subject';
import {SimoneDockerOptions} from '../domain/docker-options';
import {Response, URLSearchParams} from '@angular/http';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerService {

  private clientReachable: Observable<boolean>;
  private clientBusy: Observable<boolean>;
  private heartbeat: Observable<any>;
  private subscription: Subscription;

  private heartBeatDelayMs: number = 0;
  private pingBackOffMs: number = null;

  private heartbeatSource = new Subject<any>();
  private clientStarted: boolean;
  private heartBeatSubscription: Subscription;

  constructor(private client: DockerClient,
              private optionsService: DockerOptionsService) {

    this.subscription = new Subscription();
    this.clientBusy = Observable.of(false)
      .concat(this.client.getRunningRequestCountObservable())
      .map(count => count > 0)
      .share();
    this.clientReachable = Observable.of(false)
      .concat(this.client.getRequestSucessObservable())
      .map((successOrError: boolean | Error) => this.isReachable(successOrError))
      .do(reachable => {
          if (reachable) {
            this.resetPingBackOff();
          }
        },
      ).share();
    this.heartbeat = this.heartbeatSource
      .throttleTime(100)
      .do(a => console.log('beat'))
      .share();
    this.optionsService.getOptions()
      .subscribe(options => this.onOptionsChanged(options));
  }

  startClient() {
    this.stopClient();

    this.pingBackOffMs = 0;
    this.subscription = new Subscription();

    this.initClientPing();
    this.initHeartbeat();
    this.clientStarted = true;
  }

  stopClient() {
    this.client.stopAllRequests();
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
    this.clientStarted = false;
  }

  beat() {
    this.heartbeatSource.next(true);
  }

  getReachableObservable(): Observable<boolean> {
    return this.clientReachable;
  }

  getBusyObservable(): Observable<boolean> {
    return this.clientBusy;
  }

  getHeartBeatObservable(): Observable<boolean> {
    return this.heartbeat;
  }

  isClientStarted(): boolean {
    return this.clientStarted;
  }


  private isReachable(successOrError: boolean | Error): boolean {
    if (successOrError === true) {
      return true;
    }
    if (successOrError === false) {
      return false;
    }
    if (successOrError instanceof Response) {
      if (successOrError.status === 0) {
        return false;
      }
    }
    console.log('IS RESCHABLE');
    console.log(successOrError);
    return false;
  }

  private onOptionsChanged(options: SimoneDockerOptions) {
    this.heartBeatDelayMs = options.heartbeatDelay;
    this.initHeartbeat();
    this.beat();
  }

  private initClientPing() {
    // Ping now and once every now and then
    let pingSubscription = Observable.timer(0, 30000)
    // Skip if there are requests already running
      .withLatestFrom(this.clientBusy)
      .mergeMap(results => results[1] ? Observable.empty() : Observable.of(results[0]))
      .subscribe(t => this.ping());

    this.subscription.add(pingSubscription);
  }

  private initHeartbeat() {
    if (this.heartBeatSubscription != null) {
      this.heartBeatSubscription.unsubscribe();
    }
    if (this.heartBeatDelayMs <= 0) {
      return;
    }
    this.heartBeatSubscription = Observable.timer(0, this.heartBeatDelayMs)
      .do(b => console.log('beat?'))
      // Skip beats when not reachable
      .withLatestFrom(this.clientReachable)
      .mergeMap(results => results[1] === true ? Observable.of(true) : Observable.empty())
      .subscribe(a => this.heartbeatSource.next(true));
    // Unsubscribe when client stopped
    this.subscription.add(this.heartBeatSubscription);
  }

  private ping() {
    Observable.timer(this.pingBackOffMs == null ? 0 : this.pingBackOffMs)
      .take(1)
      .do(a => console.log('ping ' + this.pingBackOffMs))
      .mergeMap(t => this.client.ping())
      .subscribe(a => this.resetPingBackOff(),
        error => this.increasePingBackOff());
  }

  private increasePingBackOff() {
    if (this.pingBackOffMs == null) {
      this.pingBackOffMs = 500;
      return;
    }
    this.pingBackOffMs = this.pingBackOffMs * 2;
  }

  private resetPingBackOff() {
    this.pingBackOffMs = null;
  }
}
