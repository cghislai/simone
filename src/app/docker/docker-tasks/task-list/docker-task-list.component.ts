import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DockerTasksService} from '../../services/docker-tasks.service';
import {DockerService} from '../../services/docker.service';
import {TASK_COLUMN_DATA, TaskColumn} from './taskColumn';
import {Task} from '../../domain/tasks/task';
import {TaskFilter} from '../../client/domain/task-filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';

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

  @Output()
  tasksChange = new EventEmitter<Task[]>();

  tasks: Observable<Task[]>;
  columnStyleCss: string[];


  constructor(private dockerService: DockerService,
              private tasksService: DockerTasksService) {
  }

  ngOnInit() {
    let heartbeatTasks = this.dockerService.getHeartBeatObservable()
      .mergeMap(r => this.fetchTasks());
    this.tasks = Observable.concat(
      this.fetchTasks(), heartbeatTasks)
      .do(tasks => this.tasksChange.next(tasks))
      .share();
    this.updateColumnsWidths();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] != null) {
      this.dockerService.beat();
    }
    if (changes['columns'] != null) {
      this.updateColumnsWidths();
    }
  }


  getColumnLabel(column: TaskColumn): string {
    return TASK_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: TaskColumn): string {
    return TASK_COLUMN_DATA[column].field
  }

  getColumnWeight(column: TaskColumn): number {
    return TASK_COLUMN_DATA[column].weight
  }

  updateColumnsWidths() {
    let colWeights = this.columns
      .map(c => this.getColumnWeight(c));
    let totWeight = colWeights
      .reduce((cur, next) => cur + next, 0);
    this.columnStyleCss = this.columns
      .map(c => this.getColumnWeight(c))
      .map(w => w * 100 / totWeight)
      .map(p => `${p}%`);
  }

  private fetchTasks() {
    return this.tasksService.list(this.filter)
      .catch(e => Observable.of([]));
  }


}
