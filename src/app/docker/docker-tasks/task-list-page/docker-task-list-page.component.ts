import {Component, OnDestroy, OnInit} from '@angular/core';
import {DockerTasksService} from '../../services/docker-tasks.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DockerService} from '../../services/docker.service';
import {TaskFilter} from '../../client/domain/task-filter';
import {Subscription} from 'rxjs/Subscription';
import {SelectItem} from 'primeng/primeng';
import {TASK_COLUMN_DATA, TASK_COLUMNS, TaskColumn} from '../task-list/taskColumn';
import {Task} from '../../domain/tasks/task';
import {DockerStacksService} from '../../services/docker-stacks.service';

@Component({
  selector: 'app-docker-task-list-page',
  templateUrl: './docker-task-list-page.component.html',
  styleUrls: ['./docker-task-list-page.component.scss'],
})
export class DockerTaskListPageComponent implements OnInit, OnDestroy {

  filter: TaskFilter;
  columns: TaskColumn[];
  columnOptions: SelectItem[];
  taskCount: number = 0;
  stacks: string[] = [];

  private subscription: Subscription;

  constructor(private dockerService: DockerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private stackService: DockerStacksService) {

  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.onRouteParamsChange(params));
    this.dockerService.beat();
    this.initFilter();
    this.columns = [...TASK_COLUMNS];
    this.columnOptions = TASK_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: TASK_COLUMN_DATA[col].label['en'],
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  onTasksChange(tasks: Task[]) {
    this.taskCount = tasks.length;
    this.stacks = this.stackService.extractTasksStackNames(tasks);
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


  private initFilter() {
    this.filter = {id: [], label: [], name: [], node: [], service: [], desiredState: ['ready', 'running']};
  }

}
