import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DockerTasksService} from '../services/docker-tasks.service';
import {DockerService} from '../services/docker.service';
import {TASK_COLUMN_DATA, TASK_COLUMNS, TaskColumn} from './taskColumn';
import {SelectItem} from 'primeng/primeng';
import {Task} from '../domain/tasks/task';

@Component({
  selector: 'app-docker-task-list',
  templateUrl: './docker-task-list.component.html',
  styleUrls: ['./docker-task-list.component.scss'],
})
export class DockerTaskListComponent implements OnInit {


  filter: { filters: any };
  tasks: Observable<Task[]>;

  columns: TaskColumn[];
  columnOptions: SelectItem[];

  constructor(private dockerService: DockerService,
              private tasksService: DockerTasksService) {
  }

  ngOnInit() {
    this.dockerService.ping();
    this.filter = {filters: {}};
    this.filter.filters['desired-state'] = ['running'];

    this.tasks = this.dockerService.getPingResultObservable()
      .filter(r => r)
      .mergeMap(r => this.tasksService.list(this.filter));
    this.columns = [...TASK_COLUMNS];
    this.columnOptions = TASK_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: this.getColumnLabel(col),
      });
  }


  getColumnLabel(column: TaskColumn): string {
    return TASK_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: TaskColumn): string {
    return TASK_COLUMN_DATA[column].field
  }
}
