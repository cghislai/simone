import {Injectable} from '@angular/core';
import {DockerClient} from '../client/docker.client';
import {SecretFilter} from '../client/domain/secret-filter';
import {Observable} from 'rxjs/Observable';
import {Secret} from '../client/domain/secret';
import {FilterJson} from '../client/domain/filter';

@Injectable()
export class DockerSecretsService {

  constructor(private client: DockerClient) {
  }


  list(filter?: SecretFilter): Observable<Secret[]> {
    let filterJson = this.mapSecretFilter(filter);
    return this.client.listSecrets(filterJson);
  }

  private mapSecretFilter(filter: SecretFilter): FilterJson {
    let filtersJson = {};
    filtersJson['name'] = filter.names;
    return {filters: filtersJson};
  }
}
