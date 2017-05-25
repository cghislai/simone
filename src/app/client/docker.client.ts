import {Observable} from 'rxjs';
import {Headers, Http, Request, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {DockerOptionsService} from '../docker/services/docker-options.service';
import {RequestOptions} from './request-options';
import * as Dockerode from 'dockerode';
import {ServiceJson} from './domain/service';
import {TaskJson} from './domain/task';
import {FilterJson} from './domain/filter';
import {SimoneDockerOptions} from '../docker/domain/docker-options';


@Injectable()
export class DockerClient {

  private dockerode: Dockerode;

  constructor(private optionsService: DockerOptionsService,
              private http: Http) {
    this.dockerode = new Dockerode();
    this.optionsService.getOptions()
      .subscribe(options => this.onOptionsChanged(options));
  }

  listTasks(filterJson?: any): Observable<TaskJson[]> {
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

  private onOptionsChanged(options: SimoneDockerOptions) {
    this.dockerode = new Dockerode(options);
  }

  private request(options: RequestOptions): Observable<Response> {
    let path = `${options.protocol}://${options.host}:${options.port}/${options.version}/${options.path}`;
    let req = new Request({
      method: options.method,
      url: path,
      withCredentials: true,
      headers: new Headers({'Authorization': ''}),
    });
    return this.http.request(req);
  }

  private dockerRequest(f: (cb: (err, obj: any) => void) => void) {
    return new Observable(subscriber => {
      let subscribed = true;
      let callback = (err, obj: any) => {
        if (!subscribed) {
          return;
        }
        if (err != null) {
          subscriber.error(err);
        } else {
          subscriber.next(obj);
          subscriber.complete();
        }
      };
      let subscription = () => {
        subscribed = false;
      };
      f(callback);
      return subscription;
    });
  }

}
