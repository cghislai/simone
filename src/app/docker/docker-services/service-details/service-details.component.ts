import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../../domain/services/service';
import {SelectItem} from 'primeng/primeng';
import {TaskFilter} from '../../domain/tasks/task-filter';
import {TaskColumn} from '../../docker-tasks/task-list/taskColumn';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit {

  @Input()
  service: Service;

  taskFilter: TaskFilter;
  taskColumns: TaskColumn[];

  constructor() {
  }

  ngOnInit() {
    this.taskFilter = {
      service: [this.service.id],
    };
    this.taskColumns = [
      TaskColumn.SLOT,
      TaskColumn.ID,
      TaskColumn.CONTAINER,
      TaskColumn.NODE_ID,
      TaskColumn.DESIRED_STATE,
      TaskColumn.STATE,
      TaskColumn.MESSAGE
    ]
  }


}