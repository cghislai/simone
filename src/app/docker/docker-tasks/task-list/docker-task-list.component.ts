import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DockerTasksService} from '../../services/docker-tasks.service';
import {DockerService} from '../../services/docker.service';
import {TASK_COLUMN_DATA, TaskColumn} from './taskColumn';
import {Task} from '../../domain/tasks/task';
import {TaskFilter} from '../../domain/tasks/task-filter';

@Component({
  selector: 'app-docker-task-list',
  templateUrl: './docker-task-list.component.html',
  styleUrls: ['./docker-task-list.component.scss'],
})
export class DockerTaskListComponent implements OnInit, OnChanges {

  @Input()
  filter: TaskFilter;
  @Input()
  columns: TaskColumn[];

  tasks: Observable<Task[]>;


  constructor(private dockerService: DockerService,
              private tasksService: DockerTasksService) {
  }

  ngOnInit() {
    let heartbeatTasks = this.dockerService.getHeartBeatObservable()
      .mergeMap(r => this.fetchTasks());
    this.tasks = this.fetchTasks()
      .concat(heartbeatTasks)
      .share();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] != null) {
      this.dockerService.beat();
    }
  }


  getColumnLabel(column: TaskColumn): string {
    return TASK_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: TaskColumn): string {
    return TASK_COLUMN_DATA[column].field
  }

  private fetchTasks() {
    return this.tasksService.list(this.filter)
      .catch(e => Observable.of([]));
  }


}
