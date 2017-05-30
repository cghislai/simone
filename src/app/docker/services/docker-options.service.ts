import {Injectable} from '@angular/core';
import {SimoneDockerOptions} from '../domain/docker-options';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DockerOptionsService {

  private options: BehaviorSubject<SimoneDockerOptions>;
  private storageOptionsKey = 'simone.options';

  constructor() {
    let options: SimoneDockerOptions = this.restoreFromStorage();
    if (options == null) {
      options = this.createDefaultOptions();
    }
    this.options = new BehaviorSubject<SimoneDockerOptions>(options);
  }

  getOptions(): Observable<SimoneDockerOptions> {
    return this.options;
  }

  getCurrentOptions(): SimoneDockerOptions {
    return this.options.getValue();
  }

  setOptions(options: SimoneDockerOptions) {
    let clone = Object.assign({}, options);
    this.savetoStorage(clone);
    this.options.next(clone);
  }

  private savetoStorage(options: SimoneDockerOptions) {
    if (window.localStorage != null) {
      let optionsJson = JSON.stringify(options);
      window.localStorage.setItem(this.storageOptionsKey, optionsJson);
    }
  }

  private restoreFromStorage() {
    if (window.localStorage != null) {
      let json = window.localStorage.getItem(this.storageOptionsKey);
      if (json == null) {
        return null;
      }
      let options: SimoneDockerOptions = JSON.parse(json);
      return options;
    } else {
      return null;
    }
  }

  private createDefaultOptions() {
    let options: SimoneDockerOptions = {
      mode: 'tcp',
      url: 'http://hosta:4242',
      timeout: 6,
      heartbeatDelay: 0,
      socketPath: '',
      ca: '',
      cert: '',
      key: '',
      version: 'v1.25',
    };
    return options;
  }
}
