import {Observable} from 'rxjs';
import {Http} from '@angular/http';
import {Injectable, NgZone} from '@angular/core';
import {DockerOptionsService} from '../docker/services/docker-options.service';
import * as Dockerode from 'dockerode';
import {ServiceJson} from './domain/service';
import {TaskJson} from './domain/task';
import {FilterJson} from './domain/filter';
import {SimoneDockerOptions} from '../docker/domain/docker-options';
import {ContainerJson} from './domain/container';
import {AnonymousSubscription, TeardownLogic} from 'rxjs/Subscription';
import {ReplaySubject} from 'rxjs/ReplaySubject';


@Injectable()
export class DockerClient {

  private dockerode: Dockerode;
  private runningRequests = new ReplaySubject<number[]>();
  private requestIdSeq: number = 0;
  private requestsCancellations: { [key: number]: AnonymousSubscription } = {};
  private errorHandler: (err: any) => boolean;

  constructor(private optionsService: DockerOptionsService,
              private zone: NgZone, private http: Http) {
    this.dockerode = new Dockerode();
    this.optionsService.getOptions()
      .subscribe(options => this.onOptionsChanged(options));
    this.runningRequests.next([]);
  }

  listContainers(filter?: FilterJson): Observable<ContainerJson[]> {
    return this.dockerRequest(cb => this.dockerode.listContainers(filter, cb));
  }

  listTasks(filterJson?: FilterJson): Observable<TaskJson[]> {
    return this.dockerRequest(cb => this.dockerode.listTasks(filterJson, cb));
  }

  listServices(filter?: FilterJson): Observable<ServiceJson[]> {
    return this.dockerRequest(cb => this.dockerode.listServices(filter, cb));
  }

  info(): Observable<any> {
    return this.dockerRequest(cb => this.dockerode.info(cb));
  }

  ping(): Observable<any> {
    return this.dockerRequest(cb => this.dockerode.ping(cb));
  }

  listRunningRequestIds(): Observable<number[]> {
    return this.runningRequests;
  }

  stopAllRequests() {
    for (var id in this.requestsCancellations) {
      this.requestsCancellations[id].unsubscribe();
      delete this.requestsCancellations[id];
    }
  }

  setErrorHandler(handler: (err: any) => boolean) {
    this.errorHandler = handler;
  }

  private onOptionsChanged(options: SimoneDockerOptions) {
    this.dockerode = new Dockerode(options);
  }

  private getNextRequestId(): number {
    let id = this.requestIdSeq;
    this.requestIdSeq = this.requestIdSeq + 1;
    return id;
  }

  private dockerRequest(callbackHandler: (cb: (err, obj: any) => void) => void) {
    return new Observable(subscriber => {
      let subscribed = true;
      let requestId = this.getNextRequestId();

      let dockerCallback = (err, obj: any) => {
        if (!subscribed) {
          return;
        }
        this.zone.run(() => {
          if (err != null) {
            this.errorHandler(err);
            subscriber.error(err);
          } else {
            subscriber.next(obj);
            subscriber.complete();
          }
        });
      };
      let teardownLogic: TeardownLogic = () => {
        this.zone.run(() => {
          subscribed = false;
          this.runningRequests
            .take(1)
            .subscribe(requests => {
              let newRequests = requests.filter(id => id !== requestId);
              this.runningRequests.next(newRequests);
              delete this.requestsCancellations[requestId];
              console.log('unsubscribed ' + requestId + ' rem ' + newRequests.length);
            });
        });
      };
      let cancelation: AnonymousSubscription = {
        unsubscribe() {
          this.zone.run(() => {
            console.log('cancelled ' + requestId)
            subscriber.complete();
          });
        },
      };

      this.runningRequests.take(1)
        .subscribe(requests => {
          this.requestsCancellations[requestId] = cancelation;
          console.log('start ' + requestId + ' rem: ' + requests.length);
          this.runningRequests.next([...requests, requestId]);

          this.zone.runGuarded(() => {
            callbackHandler(dockerCallback);
          });
        });
      return teardownLogic;
    });
  }

}
