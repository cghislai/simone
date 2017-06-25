import {Injectable} from '@angular/core';
import {Info} from '../client/domain/info';
import {Observable} from 'rxjs/Observable';
import {DockerService} from './docker.service';
import {SwarmInfo} from '../client/domain/swarm-info';

@Injectable()
export class DockerHostService {

  private infos: Observable<Info>;
  private hostName: Observable<string>;
  private swarmInfo: Observable<SwarmInfo>;
  private swarmControl: Observable<boolean>;

  constructor(private dockerService: DockerService) {
    this.infos = this.dockerService.getInfoObservable()
      .filter(i => i != null)
      .share();
    this.hostName = this.infos
      .map(i => i.Name)
      .share();
    this.swarmInfo = this.infos
      .map(i => i.Swarm)
      .share();
    this.swarmControl = this.infos
      .map(i => i.Swarm.ControlAvailable)
      .share();
  }

  getInfo(): Observable<Info> {
    return this.infos;
  }

  getHostName(): Observable<string> {
    return this.hostName;
  }

  getSwarmInfo(): Observable<SwarmInfo> {
    return this.swarmInfo;
  }

  hasSwarmControl(): Observable<boolean> {
    return this.swarmControl;
  }

}
