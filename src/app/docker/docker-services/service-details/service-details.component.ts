import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from '../../domain/services/service';
import {TaskFilter} from '../../client/domain/task-filter';
import {TaskColumn} from '../../docker-tasks/task-list/taskColumn';
import {ServiceSpec} from '../../client/domain/service-spec';
import {DockerServicesService} from '../../services/docker-services.service';
import {BackgroundTask} from '../../domain/background-task';
import {TasksService} from '../../services/tasks.service';
import {Observable} from 'rxjs/Observable';
import {ServiceUpdateStatus} from '../../client/domain/service-update-status';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit {

  @Input()
  service: Service;
  @Output()
  serviceChanged = new EventEmitter<any>();

  taskFilter: TaskFilter;
  taskColumns: TaskColumn[];

  constructor(private dockerService: DockerServicesService,
              private tasksService: TasksService) {
  }

  ngOnInit() {
    this.taskFilter = {
      service: [this.service.id],
      desiredState: [],
      id: [],
      label: [],
      name: [],
    };
    this.taskColumns = [
      TaskColumn.SLOT,
      TaskColumn.ID,
      TaskColumn.CONTAINER,
      TaskColumn.NODE_ID,
      TaskColumn.IMAGE,
      TaskColumn.DESIRED_STATE,
      TaskColumn.STATE,
      TaskColumn.MESSAGE,
    ]
  }

  onTaskFilterDesiredStateChange(states: string[]) {
    let newFilter = Object.assign({}, this.taskFilter);
    newFilter.desiredState = states;
    this.taskFilter = newFilter;
  }

  onSpecChanged(spec: ServiceSpec) {
    let pollTask = this.dockerService.pollServiceUpdate(this.service.id)
      .share();
    let taskContent = Observable.concat(
      this.dockerService.update(this.service.id, this.service.version, spec),
      pollTask,
    );
    let labels = pollTask.map(s => s.Message)
      .distinctUntilChanged();

    let task: BackgroundTask = {
      label: `Update service ${spec.Name}`,
      content: taskContent,
      cancellable: false,
      status: labels,
    };
    this.tasksService.add(task)
      .subscribe(r => this.serviceChanged.next(true));
  }


}
