import {Observable} from 'rxjs';
import {Headers, Http, Request, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {DockerOptionsService} from '../docker/services/docker-options.service';
import {RequestOptions} from './request-options';
import * as Dockerode from 'dockerode';
import {DockerOptions} from 'dockerode';

/**
 * Created by cghislai on 11/02/17.
 */


@Injectable()
export class DockerClient {


  constructor(private optionsService: DockerOptionsService,
              private http: Http) {
  }

  info(): Observable<any> {
    let docker = new Dockerode(this.getDockerOptions());
    return this.dockerRequest(cb => docker.info(cb));
  }


  ping(): Observable<any> {
    let docker = new Dockerode(this.getDockerOptions());
    return this.dockerRequest(cb => docker.ping(cb));
  }

  private getDockerOptions() {
    return <DockerOptions>this.optionsService.getOptions();
  }

  private createOptions(arg: any): RequestOptions {
    let dockerOptions = Object.assign({}, this.optionsService.getOptions());
    return {
      method: arg.method,
      path: arg.path,
      host: dockerOptions.host,
      protocol: dockerOptions.protocol,
      port: dockerOptions.port,
      version: dockerOptions.version,
    };
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
