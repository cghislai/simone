import {DockerClient} from '../../client/docker.client';
import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from 'rxjs';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerService {

  private clientReachable = new ReplaySubject<boolean>(1);
  private clientStarted = new ReplaySubject<boolean>(1);
  private subscription: Subscription;


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

    this.clientStarted.next(false);
  }

  isStarted() {
    return this.clientStarted;
  }

  isReachable(): Observable<boolean> {
    return this.clientReachable
      .distinctUntilChanged();
  }

  info() {
    return this.client.info();
  }

  private initClientPing() {
    let timerSubscription = Observable.timer(0, 1000)
      .mergeMap(t => this.client.ping()
        .do(s => console.log('y:' + s))
        .map(s => true)
        .catch(e => {
          console.error(e);
          return Observable.of(false)
        }),
      )
      .do(s => console.log(s))
      .subscribe(reachable => this.clientReachable.next(reachable));

    this.subscription.add(timerSubscription);
  }

}
