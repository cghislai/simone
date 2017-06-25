import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DockerClient} from '../client/docker.client';
import {VolumeFilter} from '../client/domain/volume-filter';
import {Volume} from '../client/domain/volume';
import {FilterJson} from '../client/domain/filter';
import {CachedValue} from '../../utils/cached-value';
import {DockerOptionsService} from './docker-options.service';

@Injectable()
export class DockerVolumesService {


  private allVolumes: CachedValue<Volume[]>;

  constructor(private client: DockerClient,
              private optionsService: DockerOptionsService) {
    this.allVolumes = new CachedValue(() => this.list(), 300);
    this.optionsService.getCurrentOptionsObservable()
      .distinctUntilChanged()
      .subscribe(o => this.allVolumes.invalidate());
  }

  list(filter?: VolumeFilter): Observable<Volume[]> {
    let filterJson = this.mapVolumeFilterJson(filter);
    return this.client.listVolumes(filterJson);
  }

  inspect(name: string): Observable<Volume> {
    return this.client.inspectVolume(name);
  }

  getAll(): Observable<Volume[]> {
    return this.allVolumes.getValue();
  }

  private mapVolumeFilterJson(filter: VolumeFilter) {
    let json: FilterJson = {filters: {}};
    if (filter == null) {
      return json;
    }
    json.filters['name'] = filter.name;
    json.filters['driver'] = filter.driver;
    json.filters['label'] = this.client.mapFilterLabels(filter.label);
    json.filters['dangling'] = filter.dangling.map(b => b ? 'true' : 'false');

    // Remove dangling key is the intention is to display all volumes
    if (filter.dangling.length === 0 ||
      (filter.dangling.indexOf(true) >= 0 && filter.dangling.indexOf(false) >= 0)) {
      delete json.filters['dangling'];
    }
    return json;
  }
}
