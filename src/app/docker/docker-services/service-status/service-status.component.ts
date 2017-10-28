import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Service} from '../../domain/services/service';
import {TaskColumn} from '../../docker-tasks/task-list/taskColumn';
import {TaskFilter} from '../../client/domain/task-filter';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.scss'],
})
export class ServiceStatusComponent implements OnInit, OnChanges {

  @Input()
  service: Service;

  taskFilter: TaskFilter;
  taskColumns: TaskColumn[];

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['service'] != null) {
      this.onServiceChanged();
    }
  }

  ngOnInit() {
    this.taskFilter = Object.assign({}, this.taskFilter, {
      service: [this.service.id],
      desiredState: ['ready', 'running'],
    });
    this.taskColumns = [
      TaskColumn.SLOT,
      TaskColumn.ID,
      TaskColumn.DESIRED_STATE,
      TaskColumn.CONTAINER,
      TaskColumn.NODE,
      TaskColumn.IMAGE,
      TaskColumn.STATE,
      TaskColumn.MESSAGE,
    ]
  }


  onTaskFilterDesiredStateChange(states: string[]) {
    let newFilter = Object.assign({}, this.taskFilter);
    newFilter.desiredState = states;
    this.taskFilter = newFilter;
  }

  private onServiceChanged() {
    this.taskFilter = Object.assign({}, this.taskFilter, {
      service: [this.service.id],
    });
  }

}
