import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DockerClient} from '../client/docker.client';
import {VolumeFilter} from '../client/domain/volume-filter';
import {Volume} from '../client/domain/volume';
import {FilterJson} from '../client/domain/filter';

@Injectable()
export class DockerVolumesService {

  constructor(private client: DockerClient) {
  }

  list(filter?: VolumeFilter): Observable<Volume[]> {
    let filterJson = this.mapVolumeFilterJson(filter);
    return this.client.listVolumes(filterJson);
  }


  private mapVolumeFilterJson(filter: VolumeFilter) {
    let json: FilterJson = {filters: {}};
    json.filters['name'] = filter.name;
    json.filters['driver'] = filter.driver;
    json.filters['label'] = this.client.mapFilterLabels(filter.label);
    json.filters['dangling'] = filter.dangling ? ['1'] : ['0'];
    return json;
  }
}
