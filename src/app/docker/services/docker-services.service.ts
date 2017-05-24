import {DockerClient} from '../../client/docker.client';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {ServiceJson} from '../../client/domain/service';
import {Service} from '../../domain/services/service';
import {Observable} from 'rxjs/Observable';
import {ServiceSpec} from '../../domain/services/service-spec';
import {ServiceSpecJson} from '../../client/domain/service-spec';
import {ServiceMode} from '../../domain/services/service-mode';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerServicesService {

  constructor(private client: DockerClient) {
  }

  list(): Observable<Service[]> {
    return this.client.listServices()
      .map(services => services.map(s => this.mapServiceJson(s)));
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

  private mapServiceSpecModeJson(spec: { Replicated?: { Replicas: number } }): { mode: ServiceMode, replicas?: number } {
    let mode = {
      mode: spec.Replicated != null ? ServiceMode.REPLCIATED : ServiceMode.GLOBAL,
      replicas: spec.Replicated != null ? spec.Replicated.Replicas : null,
    };
    return mode;
  }
}
