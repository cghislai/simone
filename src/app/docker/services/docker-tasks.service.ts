import {DockerClient} from '../client/docker.client';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {TaskJson} from '../client/domain/task';
import {FilterJson} from '../client/domain/filter';
import {Task} from '../domain/tasks/task';
import {TaskFilter} from '../domain/tasks/task-filter';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerTasksService {

  constructor(private client: DockerClient) {
  }

  list(filter?: TaskFilter): Observable<Task[]> {
    let filterJson = this.mapTaskFilterJson(filter);
    return this.client.listTasks(filterJson)
      .map(tasks => tasks.map(s => this.mapTaskJson(s)));
  }


  inspect(id: string): Observable<Task> {
    return this.client.inspectTask(id)
      .map(task => this.mapTaskJson(task));
  }

  private mapTaskJson(json: TaskJson): Task {
    return {
      id: json.ID,
      version: json.Version,
      createdAt: moment(json.CreatedAt),
      updatedAt: moment(json.UpdatedAt),
      spec: json.Spec,
      serviceID: json.ServiceID,
      slot: json.Slot,
      nodeID: json.NodeID,
      status: json.Status,
      desiredState: json.DesiredState,
      networksAttachments: json.NetworksAttachments,
    };
  }

  private mapTaskFilterJson(filter: TaskFilter): FilterJson {
    let json: FilterJson = {filters: {}};
    json.filters['id'] = filter.id;
    json.filters['name'] = filter.name;
    json.filters['label'] = filter.label;
    json.filters['desired-state'] = filter.desiredState;
    json.filters['service'] = filter.service;
    json.filters['node'] = filter.node;
    return json;
  }
}
