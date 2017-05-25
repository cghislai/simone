import {DockerClient} from '../../client/docker.client';
import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import {DockerOptionsService} from './docker-options.service';
import {Subject} from 'rxjs/Subject';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerService {

  private clientReachable = new BehaviorSubject<boolean>(false);
  private clientStarted = new BehaviorSubject<boolean>(false);
  private clientBusy: Observable<boolean>;
  private subscription: Subscription;

  private pingDelay: number = 6000;
  private pingBackOffMs: number = 100;
  private pingSource = new Subject<any>();
  private firstPingFailure: moment.Moment;
  private lastPingFailure: moment.Moment;

  constructor(private client: DockerClient,
              private optionsService: DockerOptionsService) {
    this.optionsService.getOptions()
      .subscribe(options => {
        this.pingDelay = options.heartbeatDelay;
        this.startClient();
      });
    this.clientBusy = this.client.listRunningRequestIds()
      .map(ids => ids != null && ids.length > 0)
      .share();
    this.client.setErrorHandler((error) => this.handleRequestError(error));
  }

  startClient() {
    this.stopClient();
    this.subscription = new Subscription();
    this.clientStarted.next(true);
    this.doTryPing();
    this.initClientPing();
  }

  stopClient() {
    this.client.stopAllRequests();
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
    this.pingBackOffMs = 0;
    this.clientStarted.next(false);
  }

  ping() {
    this.pingSource.next(true);
  }

  getStartedObservable() {
    return this.clientStarted.share();
  }

  getReachableObservable(): Observable<boolean> {
    return this.clientReachable.share();
  }

  getBusyObservable(): Observable<boolean> {
    return this.clientBusy.share();
  }

  handleRequestError(error: any): boolean {
    console.log(error);
    this.setReachable(false);
    return false;
  }

  private initClientPing() {
    let timer = this.pingDelay > 0 ? Observable.timer(0, this.pingDelay * 1000) : Observable.empty();
    let timerSubscription = Observable.merge(timer, this.pingSource)
      .debounceTime(100)
      .withLatestFrom(this.client.listRunningRequestIds())
      .map(results => results[1].length > 0 ? null : results[0])
      .filter(r => r != null)
      .mergeMap(t => this.doTryPing())
      .do(o=>console.log('po '+o))
      .subscribe(reachable => {
        this.setReachable(reachable);
      });

    this.subscription.add(timerSubscription);
  }

  private doTryPing(): Observable<boolean> {
    console.log('ping ' + this.pingBackOffMs);
    return Observable.timer(this.pingBackOffMs)
      .first()
      .mergeMap(s => this.pingBackOffMs === 0 ? Observable.of(true) : this.client.ping())
      .catch(e => {
        return Observable.of(false);
      });
  }


  private setReachable(reachable) {
    if (reachable) {
      this.onClientReachable();
    } else {
      this.onClientUnreachable();
    }
    this.clientReachable.next(reachable);
  }

  private onClientReachable() {
    this.pingBackOffMs = 0;
    this.lastPingFailure = null;
    this.firstPingFailure = null;
  }


  private onClientUnreachable() {
    console.log('unreachable');
    let backoff = Math.max(500, this.pingBackOffMs);
    this.pingBackOffMs = Math.min(backoff * 2, 3 * 60000);
    this.lastPingFailure = moment().utc();
    if (this.firstPingFailure == null) {
      this.firstPingFailure = moment().utc();
    }
  }
}
