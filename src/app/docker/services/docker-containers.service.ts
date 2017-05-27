import {DockerClient} from '../../client/docker.client';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DockerOptionsService} from './docker-options.service';
import {ContainerFilter} from '../domain/containers/container-filter';
import {Container} from '../domain/containers/container';
import {MountSettings} from '../domain/containers/mount-settings';
import {MountSettingsJson} from '../../client/domain/mount-settings';
import {ContainerFilterJson} from '../../client/domain/container-filter';
import {ContainerInspectInfo, ContainerLogsOptions, NetworkInfo} from 'dockerode';
import {ContainerJson} from '../../client/domain/container';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerContainersService {

  constructor(private client: DockerClient,
              private optionsService: DockerOptionsService) {
  }

  list(filter?: ContainerFilter): Observable<Container[]> {
    let filterJson = this.mapContainerFilterJson(filter);
    return this.client.listContainers(filterJson)
      .map(services => services.map(s => this.mapContainerJson(s)));
  }

  inspect(id: string): Observable<ContainerInspectInfo> {
    return this.client.inspectContainer(id);
  }

  logs(id: string, options: ContainerLogsOptions): Observable<NodeJS.ReadableStream> {
    return this.client.getContainerLogs(id, options);

  }

  private mapContainerJson(json: ContainerJson): Container {
    let networks = <{ [key: string]: NetworkInfo }> json.NetworkSettings.Networks;
    let mounts: MountSettings[] = json.Mounts.map(
      mount => this.mapMount(mount),
    );
    return {
      id: json.Id,
      names: json.Names,
      image: json.Image,
      imageId: json.ImageID,
      command: json.Command,
      created: json.Created,
      state: json.State,
      status: json.Status,
      ports: json.Ports,
      labels: json.Labels,
      sizeRw: json.SizeRw,
      sizeRootFs: json.SizeRootFs,
      hostConfig: json.HostConfig,
      networkSettings: {networks: networks},
      mounts: mounts,
    };
  }

  private mapMount(mount: MountSettingsJson): MountSettings {
    return {
      name: mount.Name,
      mode: mount.Mode,
      destination: mount.Destination,
      driver: mount.Driver,
      propagation: mount.Propagation,
      rw: mount.RW,
      source: mount.Source,
    };
  }


  private mapContainerFilterJson(filter: ContainerFilter): ContainerFilterJson {
    let json: ContainerFilterJson = {filters: {}};
    json.filters['ancestor'] = filter.filters.ancestor;
    json.filters['before'] = filter.filters.before;
    json.filters['exited'] = filter.filters.exited == null ? null :
      filter.filters.exited.map(s => s ? 'true' : 'false');
    json.filters['health'] = filter.filters.health;
    json.filters['id'] = filter.filters.id;
    json.filters['isolation'] = filter.filters.isolation;
    json.filters['is-task'] = filter.filters.isTask == null ? null :
      filter.filters.isTask.map(s => s ? 'true' : 'false');
    json.filters['label'] = filter.filters.label;
    json.filters['name'] = filter.filters.name;
    json.filters['network'] = filter.filters.network;
    json.filters['since'] = filter.filters.since;
    json.filters['status'] = filter.filters.status;
    json.filters['volume'] = filter.filters.volume;
    json.all = filter.includeStopped;
    json.limit = filter.limit;
    json.size = filter.includeSizes;
    return json;
  }
}
