import {Injectable} from '@angular/core';
import {DockerClient} from '../client/docker.client';
import {ConfigFilter} from '../client/domain/config-filter';
import {Observable} from 'rxjs/Observable';
import {Config} from '../client/domain/config';
import {FilterJson} from '../client/domain/filter';

@Injectable()
export class DockerConfigsService {

  constructor(private client: DockerClient) {
  }


  list(filter?: ConfigFilter): Observable<Config[]> {
    let filterJson = this.mapConfigFilter(filter);
    return this.client.listConfigs(filterJson);
  }

  inspect(id: string): Observable<Config> {
    return this.client.inspectConfig(id);

  }

  private mapConfigFilter(filter: ConfigFilter): FilterJson {
    let filtersJson = {};
    filtersJson['name'] = filter.names;
    return {filters: filtersJson};
  }
}
