import {Injectable} from '@angular/core';
import {SimoneDockerOptions} from '../../domain/docker-options';

@Injectable()
export class DockerOptionsService {

  private options: SimoneDockerOptions;

  constructor() {
    this.options = {
      host: 'hosta',
      port: 4242,
      protocol: 'http',
      timeout: 6,
      socketPath: '',
      ca: '',
      cert: '',
      key: '',
      version: 'v1.25',
    };
  }

  getOptions(): SimoneDockerOptions {
    return Object.assign({}, this.options);
  }

  setOptions(options: SimoneDockerOptions) {
    Object.assign(this.options, options);
  }
}