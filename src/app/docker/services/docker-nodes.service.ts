import {Injectable} from '@angular/core';
import {DockerClient} from '../client/docker.client';
import {Observable} from 'rxjs/Observable';
import {FilterJson} from '../client/domain/filter';
import {NodeFilter} from '../client/domain/node-filter';
import {Node} from '../client/domain/node';
import {NodeSpec} from '../client/domain/node-spec';
import {Version} from '../client/domain/version';
import {CachedValue} from '../../utils/cached-value';
import {DockerClientConfigService} from './docker-client.service';
import {DockerClientConfig} from '../domain/docker-client-config';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

@Injectable()
export class DockerNodesService {

  private allNodes: CachedValue<Node[]>;

  constructor(private client: DockerClient,
              private configService: DockerClientConfigService) {
    this.allNodes = new CachedValue(() => this.list(), 300);
    this.configService.getActiveConfig()
      .distinctUntilChanged()
      .subscribe(o => this.allNodes.invalidate());
  }

  list(filter?: NodeFilter): Observable<Node[]> {
    return this.configService.getActiveConfig()
      .take(1)
      .mergeMap((config: DockerClientConfig) => {
        if (config.serverInfo != null && !config.serverInfo.swarmControl) {
          return [];
        }
        let filterJson = this.createFilterJson(filter);
        return this.client.listNodes(filterJson);
      });
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
