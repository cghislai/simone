import {DockerClient} from '../client/docker.client';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ContainerFilter} from '../domain/containers/container-filter';
import {Container} from '../domain/containers/container';
import {MountSettings} from '../domain/containers/mount-settings';
import {MountSettingsJson} from '../client/domain/mount-settings';
import {ContainerFilterJson} from '../client/domain/container-filter';
import {ContainerInspectInfo, NetworkInfo} from 'dockerode';
import {ContainerJson} from '../client/domain/container';
import {ContainerStatsOptions} from '../client/domain/container-stats-options';
import {DockerService} from './docker.service';
import {DemuxedStream} from '../client/domain/demuxedStream';
import {ContainerAttachOptions} from '../client/domain/container-attach-options';
import {ContainerStats} from '../client/domain/container-stats';
import {ContainerRemoveOptions} from '../client/domain/container-remove-options';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerContainersService {

  constructor(private client: DockerClient,
              private dockerService: DockerService) {
  }

  list(filter?: ContainerFilter): Observable<Container[]> {
    let filterJson = this.mapContainerFilterJson(filter);
    return this.client.listContainers(filterJson)
      .map(services => services.map(s => this.mapContainerJson(s)));
  }

  inspect(id: string): Observable<ContainerInspectInfo> {
    return this.client.inspectContainer(id);
  }

  logs(id: string, options: ContainerAttachOptions): Observable<DemuxedStream> {
    return this.client.getContainerLogsStream(id, options);
  }

  stats(id: string, options: ContainerStatsOptions): Observable<ContainerStats> {
    return this.client.getContainerStats(id, options)
      .map(response => response.json());
  }

  pause(id: string): Observable<boolean> {
    return this.client.pauseContainer(id)
      .map(r => true);

  }

  resume(id: string): Observable<boolean> {
    return this.client.resumeContainer(id)
      .map(r => true);
  }

  restart(id: string): Observable<boolean> {
    return this.client.restartContainer(id)
      .map(r => true);
  }

  stop(id: string): Observable<boolean> {
    return this.client.stopContainer(id)
      .map(r => true);
  }

  start(id: string): Observable<boolean> {
    return this.client.startContainer(id)
      .map(r => true);
  }

  remove(id: string, options: ContainerRemoveOptions) {
    return this.client.removeContainer(id, options)
      .map(r => true);
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
    let filters = {};
    filters['ancestor'] = filter.filters.ancestor;
    filters['before'] = filter.filters.before;
    filters['exited'] = filter.filters.exited == null ? null :
      filter.filters.exited.map(s => s ? 'true' : 'false');
    filters['health'] = filter.filters.health;
    filters['id'] = filter.filters.id;
    filters['isolation'] = filter.filters.isolation;
    filters['is-task'] = filter.filters.isTask == null ? null :
      filter.filters.isTask.map(s => s ? 'true' : 'false');
    filters['label'] = filter.filters.label;
    filters['name'] = filter.filters.name;
    filters['network'] = filter.filters.network;
    filters['since'] = filter.filters.since;
    filters['status'] = filter.filters.status;
    filters['volume'] = filter.filters.volume;

    let filteredFilters = {};
    Reflect.ownKeys(filters)
      .filter(key => filters[key] != null)
      .forEach(key => filteredFilters[key] = filters[key]);

    let json: ContainerFilterJson = {filters: filteredFilters};
    json.all = filter.includeStopped;
    json.limit = filter.limit;
    json.size = filter.includeSizes;
    return json;
  }
}
