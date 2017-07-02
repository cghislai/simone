import {DockerClient} from '../client/docker.client';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {TaskJson} from '../client/domain/task';
import {FilterJson} from '../client/domain/filter';
import {Task} from '../domain/tasks/task';
import {TaskFilter} from '../client/domain/task-filter';
import {DockerServicesService} from './docker-services.service';
import {DockerNodesService} from './docker-nodes.service';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class DockerTasksService {

  constructor(private client: DockerClient,
              private nodeService: DockerNodesService,
              private serviceService: DockerServicesService) {
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
    let task = {
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
      nodeName: json.NodeID,
      serviceName: json.ServiceID,
    };
    this.getServiceLabel(task.serviceID)
      .subscribe(label => task.serviceName = label);
    this.getNodeLabel(task.nodeID)
      .subscribe(label => task.nodeName = label);
    return task;
  }

  private mapTaskFilterJson(filter: TaskFilter): FilterJson {
    let json: FilterJson = {filters: {}};
    json.filters['id'] = filter.id;
    json.filters['name'] = filter.name;
    json.filters['label'] = this.client.mapFilterLabels(filter.label);
    json.filters['desired-state'] = filter.desiredState;
    json.filters['service'] = filter.service;
    json.filters['node'] = filter.node;
    return json;
  }


  private getNodeLabel(id: string): Observable<string> {
    return Observable.concat(Observable.of(id),
      this.nodeService.getAll()
        .map(nodes => nodes.find(n => n.ID === id))
        .filter(node => node != null)
        .map(node => node.Description.Hostname),
    );
  }

  private getServiceLabel(id: string): Observable<string> {
    return Observable.concat(Observable.of(id),
      this.serviceService.getAll()
        .map(services => services.find(s => s.id === id))
        .filter(service => service != null)
        .map(service => service.spec.Name),
    );
  }
}
