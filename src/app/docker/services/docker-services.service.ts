import {DockerClient} from '../client/docker.client';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {ServiceJson} from '../client/domain/service';
import {Observable} from 'rxjs/Observable';
import {FilterJson} from '../client/domain/filter';
import {ServiceFilter} from '../domain/services/service-filter';
import {Service} from '../domain/services/service';
import {DockerOptionsService} from './docker-options.service';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerServicesService {

  constructor(private client: DockerClient,
              private optionsService: DockerOptionsService) {
  }

  list(filter?: ServiceFilter): Observable<Service[]> {
    let filterJson = this.mapServiceFilterJson(filter);
    return this.client.listServices(filterJson)
      .map(services => services.map(s => this.mapServiceJson(s)));
  }


  inspect(id: string): Observable<Service> {
    return this.client.inspectService(id)
      .map(service => this.mapServiceJson(service));
  }

  private mapServiceJson(json: ServiceJson): Service {
    return {
      id: json.ID,
      endPoint: json.Endpoint,
      spec: json.Spec,
      previousSpec: json.PreviousSpec,
      updatedAt: moment(json.UpdatedAt),
      updateStatus: json.UpdateStatus,
      version: json.Version,
      createdAt: moment(json.CreatedAt),
    };
  }

  private mapServiceFilterJson(filter: ServiceFilter): FilterJson {
    let json: FilterJson = {filters: {}};
    json.filters['id'] = filter.id;
    json.filters['name'] = filter.name;
    json.filters['label'] = filter.label;
    return json;
  }

}
