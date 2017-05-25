import {Injectable} from '@angular/core';
import {SimoneDockerOptions} from '../domain/docker-options';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DockerOptionsService {

  private options: BehaviorSubject<SimoneDockerOptions>;

  constructor() {
    let options: SimoneDockerOptions = {
      host: 'hosta',
      port: 4242,
      protocol: 'http',
      timeout: 6,
      heartbeatDelay: 6,
      socketPath: '',
      ca: '',
      cert: '',
      key: '',
      version: 'v1.25',
    };
    this.options = new BehaviorSubject<SimoneDockerOptions>(options);
  }

  getOptions(): Observable<SimoneDockerOptions> {
    return this.options;
  }

  getLastOptions(): SimoneDockerOptions {
    return this.options.getValue();
  }

  setOptions(options: SimoneDockerOptions) {
    let clone = Object.assign({}, options);
    this.options.next(clone);
  }
}
