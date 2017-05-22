import {DockerClient} from '../../client/docker.client';
import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as moment from 'moment';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerService {

  private clientReachable = new BehaviorSubject<boolean>(false);
  private clientStarted = new BehaviorSubject<boolean>(false);
  private subscription: Subscription;


  private pingBackOffMs: number = 100;
  private firstPingFailure: moment.Moment;
  private lastPingFailure: moment.Moment;

  constructor(private client: DockerClient) {
  }

  startClient() {
    this.stopClient();
    this.subscription = new Subscription();
    this.clientStarted.next(true);
    this.initClientPing();
  }

  stopClient() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
    this.pingBackOffMs = 0;
    this.clientStarted.next(false);
  }

  isStarted() {
    return this.clientStarted.value;
  }

  getStartedObservable() {
    return this.clientStarted;
  }

  getPingResultObservable(): Observable<boolean> {
    return this.clientReachable;
  }

  info() {
    return this.client.info();
  }

  private initClientPing() {
    let timerSubscription = Observable.timer(0, 3000)
      .mergeMap(t => this.doTryPing())
      .subscribe(reachable => this.clientReachable.next(reachable));

    this.subscription.add(timerSubscription);
  }

  private doTryPing(): Observable<boolean> {
    console.log('ping ' + this.pingBackOffMs);
    return Observable.timer(this.pingBackOffMs)
      .first()
      .mergeMap(s => this.client.ping())
      .map(s => true)
      .do(s => this.onClientReachable())
      .catch(e => {
        this.onClientUnreachable();
        return Observable.of(false);
      });
  }

  private onClientReachable() {
    this.pingBackOffMs = 0;
    this.lastPingFailure = null;
    this.firstPingFailure = null;
  }

  private onClientUnreachable() {
    let backoff = Math.max(100, this.pingBackOffMs);
    this.pingBackOffMs = Math.min(backoff * 2, 3 * 60000);
    this.lastPingFailure = moment().utc();
    if (this.firstPingFailure == null) {
      this.firstPingFailure = moment().utc();
    }
  }
}
