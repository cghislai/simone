import {Injectable} from '@angular/core';
import {DockerClient} from '../client/docker.client';
import {Observable} from 'rxjs/Observable';
import {FilterJson} from '../client/domain/filter';
import {NodeFilter} from '../client/domain/node-filter';
import {Node} from '../client/domain/node';
import {NodeSpec} from '../client/domain/node-spec';
import {Version} from '../client/domain/version';
import {CachedValue} from '../../utils/cached-value';
import {DockerOptionsService} from './docker-options.service';

@Injectable()
export class DockerNodesService {

  private allNodes: CachedValue<Node[]>;

  constructor(private client: DockerClient,
              private optionsService: DockerOptionsService) {
    this.allNodes = new CachedValue(() => this.list(), 300);
    this.optionsService.getCurrentOptionsObservable()
      .distinctUntilChanged()
      .subscribe(o => this.allNodes.invalidate());
  }

  list(filter?: NodeFilter): Observable<Node[]> {
    let filterJson = this.createFilterJson(filter);
    return this.client.listNodes(filterJson);
  }

  inspect(id: string): Observable<Node> {
    return this.client.inspectNode(id);
  }

  update(id: string, version: Version, spec: NodeSpec): Observable<any> {
    return this.client.updateNode(id, version, spec)
      .do(n => this.allNodes.invalidate());
  }

  getAll(): Observable<Node[]> {
    return this.allNodes.getValue();
  }

  private createFilterJson(filter: NodeFilter): FilterJson {
    if (filter == null) {
      return {filters: {}};
    }
    let filters = {};
    filters['label'] = filter.label;
    filters['id'] = filter.id;
    filters['name'] = filter.name;
    filters['membership'] = filter.membership;
    filters['role'] = filter.role;
    return {
      filters: filters,
    };
  }
}
