import {Injectable} from '@angular/core';
import {DockerClient} from '../client/docker.client';
import {NetworkFilter} from '../client/domain/network-filter';
import {Network} from '../client/domain/network';
import {Observable} from 'rxjs/Observable';
import {FilterJson} from '../client/domain/filter';

@Injectable()
export class DockerNetworksService {

  constructor(private client: DockerClient) {
  }


  list(filter?: NetworkFilter): Observable<Network[]> {
    let filterJson = this.mapNetworkFilterJson(filter);
    return this.client.listNetworks(filterJson);
  }

  inspect(id: string): Observable<Network> {
    return this.client.inspectNetwork(id);
  }

  mapNetworkFilterJson(filter: NetworkFilter): FilterJson {
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
}
