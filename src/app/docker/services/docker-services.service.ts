import {DockerClient} from '../../client/docker.client';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {ServiceJson} from '../../client/domain/service';
import {Observable} from 'rxjs/Observable';
import {ServiceSpecJson} from '../../client/domain/service-spec';
import {FilterJson} from '../../client/domain/filter';
import {ServiceFilter} from '../domain/services/service-filter';
import {Service} from '../domain/services/service';
import {ServiceSpec} from '../domain/services/service-spec';
import {ServiceMode} from '../domain/services/service-mode';
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
    let spec: ServiceSpec = this.mapServiceSpecJson(json.Spec);
    let previousSpec: ServiceSpec = this.mapServiceSpecJson(json.PreviousSpec);
    return {
      id: json.ID,
      endPoint: json.Endpoint,
      spec: spec,
      previousSpec: previousSpec,
      updatedAt: moment(json.UpdatedAt),
      updateStatus: json.UpdateStatus,
      version: json.Version,
      createdAt: moment(json.CreatedAt),
    };
  }

  private mapServiceSpecJson(spec: ServiceSpecJson): ServiceSpec {
    return {
      endPointSpec: spec.EndpointSpec,
      labels: spec.Labels,
      name: spec.Name,
      networks: spec.Networks,
      taskTemplate: spec.TaskTemplate,
      mode: this.mapServiceSpecModeJson(spec.Mode),
    };
  }

  private mapServiceFilterJson(filter: ServiceFilter): FilterJson {
    let json: FilterJson = {filters: {}};
    json.filters['id'] = filter.id;
    json.filters['name'] = filter.name;
    json.filters['label'] = filter.label;
    return json;
  }

  private mapServiceSpecModeJson(spec: { Replicated?: { Replicas: number } }): { mode: ServiceMode, replicas?: number } {
    let mode = {
      mode: spec.Replicated != null ? ServiceMode.REPLCIATED : ServiceMode.GLOBAL,
      replicas: spec.Replicated != null ? spec.Replicated.Replicas : null,
    };
    return mode;
  }
}
