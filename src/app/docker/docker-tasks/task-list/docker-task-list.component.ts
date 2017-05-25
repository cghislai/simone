import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DockerTasksService} from '../../services/docker-tasks.service';
import {DockerService} from '../../services/docker.service';
import {TASK_COLUMN_DATA, TASK_COLUMNS, TaskColumn} from './taskColumn';
import {SelectItem} from 'primeng/primeng';
import {Task} from '../../domain/tasks/task';
import {TaskFilter} from '../../domain/tasks/task-filter';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-docker-task-list',
  templateUrl: './docker-task-list.component.html',
  styleUrls: ['./docker-task-list.component.scss'],
})
export class DockerTaskListComponent implements OnInit {


  tasks: Observable<Task[]>;
  columns: TaskColumn[];
  columnOptions: SelectItem[];
  filter: TaskFilter;

  constructor(private dockerService: DockerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private tasksService: DockerTasksService) {
  }

  ngOnInit() {
    this.dockerService.ping();
    this.tasks = this.dockerService.getPingResultObservable()
      .filter(rechable => rechable)
      .mergeMap(r => this.onHeartbeat());
    this.columns = [...TASK_COLUMNS];
    this.columnOptions = TASK_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: this.getColumnLabel(col),
      });
    this.filter = {id: [], label: [], name: [], node: [], service: [], desiredState: []};
    this.activatedRoute.params
      .subscribe(params => this.onRouteParamsChange(params));
  }

  onFilterChange(filter: TaskFilter) {
    if (this.activatedRoute != null) {
      let params = {};
      if (filter.id.length > 0) {
        params['id'] = this.reduceToRouteParam(filter.id);
      }
      if (filter.name.length > 0) {
        params['name'] = this.reduceToRouteParam(filter.name);
      }
      if (filter.label.length > 0) {
        params['label'] = this.reduceToRouteParam(filter.label);
      }
      if (filter.node.length > 0) {
        params['node'] = this.reduceToRouteParam(filter.node);
      }
      if (filter.service.length > 0) {
        params['service'] = this.reduceToRouteParam(filter.service);
      }
      if (filter.desiredState.length > 0) {
        params['desired-state'] = this.reduceToRouteParam(filter.desiredState);
      }
      this.router.navigate(['../', params], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
      });
    }
  }

  getColumnLabel(column: TaskColumn): string {
    return TASK_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: TaskColumn): string {
    return TASK_COLUMN_DATA[column].field
  }

  private onRouteParamsChange(params: Params) {
    let filter = Object.assign({}, this.filter);
    filter.id = this.extractRouteParam(params['id']);
    filter.name = this.extractRouteParam(params['name']);
    filter.label = this.extractRouteParam(params['label']);
    filter.desiredState = <('running' | 'shutdown' | 'accepted')[]>this.extractRouteParam(params['desired-state']);
    filter.service = this.extractRouteParam(params['service']);
    filter.node = this.extractRouteParam(params['node']);

    this.filter = filter;
    this.dockerService.ping();
  }

  private onHeartbeat() {
    return this.tasksService.list(this.filter);
  }

  private reduceToRouteParam(array: string[]): string {
    return array == null ? null : array.reduce((cur, next) => {
      return cur == null ? next : cur + ',' + next
    }, null);
  }

  private extractRouteParam(param: string): string[] {
    if (param == null) {
      return [];
    }
    return param.split(',');
  }

}
