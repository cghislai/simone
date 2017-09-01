import {DockerClient} from '../client/docker.client';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {ServiceJson} from '../client/domain/service';
import {Observable} from 'rxjs/Observable';
import {FilterJson} from '../client/domain/filter';
import {ServiceFilter} from '../domain/services/service-filter';
import {Service} from '../domain/services/service';
import {ServiceSpec} from '../client/domain/service-spec';
import {Version} from '../client/domain/version';
import {CachedValue} from '../../utils/cached-value';
import {DockerClientConfigService} from './docker-client.service';
import {DockerClientConfig} from '../domain/docker-client-config';


/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerServicesService {


  private allServices: CachedValue<Service[]>;

  constructor(private client: DockerClient,
              private configService: DockerClientConfigService) {
    this.allServices = new CachedValue(() => this.list(), 300);
    this.configService.getActiveConfig()
      .distinctUntilChanged()
      .subscribe(o => this.allServices.invalidate());
  }

  list(filter?: ServiceFilter): Observable<Service[]> {
    return this.configService.getActiveConfig()
      .take(1)
      .mergeMap((config: DockerClientConfig) => {
        if (config.serverInfo != null && !config.serverInfo.swarmControl) {
          return [];
        }
        let filterJson = this.mapServiceFilterJson(filter);
        return this.client.listServices(filterJson)
          .map(services => services.map(s => this.mapServiceJson(s)));
      });

  }


  inspect(id: string): Observable<Service> {
    return this.client.inspectService(id)
      .map(service => this.mapServiceJson(service));
  }

  update(id: string, version: Version, spec: ServiceSpec): Observable<any> {
    return this.client.updateService(id, version, spec);
  }


  getAll(): Observable<Service[]> {
    return this.allServices.getValue();
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
    if (filter == null) {
      return json;
    }
    json.filters['id'] = filter.id;
    json.filters['name'] = filter.name;
    json.filters['label'] = this.client.mapFilterLabels(filter.label);
    return json;
  }

}
