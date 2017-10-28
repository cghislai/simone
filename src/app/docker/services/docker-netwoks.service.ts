import {Injectable} from '@angular/core';
import {DockerClient} from '../client/docker.client';
import {NetworkFilter} from '../client/domain/network-filter';
import {Network} from '../client/domain/network';
import {Observable} from 'rxjs/Observable';
import {FilterJson} from '../client/domain/filter';
import {CachedValue} from '../../utils/cached-value';
import {DockerClientConfigService} from './docker-client.service';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class DockerNetworksService {

  private allNetworks: CachedValue<Network[]>;

  constructor(private client: DockerClient,
              private configService: DockerClientConfigService) {
    this.allNetworks = new CachedValue(() => this.listAll(), 300);
    this.configService.getActiveConfig()
      .distinctUntilChanged()
      .subscribe(o => this.allNetworks.invalidate());
  }

  list(filter?: NetworkFilter): Observable<Network[]> {
    let filterJson = this.mapNetworkFilterJson(filter);
    return this.client.listNetworks(filterJson);
  }

  inspect(id: string): Observable<Network> {
    return this.client.inspectNetwork(id);
  }

  getAll(): Observable<Network[]> {
    return this.allNetworks.getValue();
  }

  private mapNetworkFilterJson(filter: NetworkFilter): FilterJson {
    if (filter == null) {
      return {filters: {}};
    }
    let filters = {};
    filters['label'] = filter.label;
    filters['driver'] = filter.driver;
    filters['name'] = filter.name;
    filters['id'] = filter.id;
    filters['type'] = filter.type;
    return {filters: filters};
  }

  private listAll(): Observable<Network[]> {
    return this.list();
  }

}
