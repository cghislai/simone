import {DockerClient} from '../../client/docker.client';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {TaskJson} from '../../client/domain/task';
import {FilterJson} from '../../client/domain/filter';
import {Task} from '../domain/tasks/task';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerTasksService {

  constructor(private client: DockerClient) {
  }

  list(filter?: FilterJson): Observable<Task[]> {
    return this.client.listTasks(filter)
      .map(tasks => tasks.map(s => this.mapTaskJson(s)));
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

}
