import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ContainerFilter, EMPTY_CONTAINER_FILTER} from '../../domain/containers/container-filter';
import {SelectItem} from 'primeng/primeng';
import {CONTAINER_COLUMN_DATA, CONTAINER_COLUMNS, ContainerColumn} from './container-column';
import {Container} from '../../domain/containers/container';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DockerService} from '../../services/docker.service';
import {DockerContainersService} from '../../services/docker-containers.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss'],
})
export class ContainerListComponent implements OnInit, OnDestroy {


  containers: Observable<Container[]>;
  columns: ContainerColumn[];
  columnOptions: SelectItem[];
  filter: ContainerFilter;

  private routeSubscription: Subscription;


  constructor(private dockerService: DockerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private zone: NgZone,
              private containerService: DockerContainersService) {
  }

  ngOnInit() {
    let heartBeatsContainers = this.dockerService.getHeartBeatObservable()
      .mergeMap(r => this.fetchContainers());
    this.columns = this.initColumns();
    this.columnOptions = CONTAINER_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: this.getColumnLabel(col),
      });
    this.filter = Object.assign({}, EMPTY_CONTAINER_FILTER);
    this.routeSubscription = this.activatedRoute.params
      .subscribe(params => this.onRouteParamsChange(params));
    this.containers = this.fetchContainers()
      .concat(heartBeatsContainers)
      .share();
  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }


  onFilterChange(filter: ContainerFilter) {
    if (this.activatedRoute != null) {
      let params = {};
      params['include-stopped'] = '' + filter.includeStopped;
      if (filter.filters.id.length > 0) {
        params['id'] = this.reduceToRouteParam(filter.filters.id);
      }
      if (filter.filters.name.length > 0) {
        params['name'] = this.reduceToRouteParam(filter.filters.name);
      }
      if (filter.filters.label.length > 0) {
        params['label'] = this.reduceToRouteParam(filter.filters.label);
      }
      if (filter.filters.isTask != null && filter.filters.isTask.length > 0) {
        params['is-task'] = this.reduceToRouteParam(filter.filters.isTask
          .map(p => p ? 'true' : 'false'));
      }
      this.router.navigate(['../', params], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
      });
    }
  }

  onContainerChange() {
    this.dockerService.beat();
  }


  fetchContainers(): Observable<Container[]> {
    return this.containerService.list(this.filter)
      .catch(e => Observable.of([]));
  }

  private onRouteParamsChange(params: Params) {
    let filter = Object.assign({}, this.filter);
    filter.includeStopped = params['include-stopped'] === 'true';
    filter.filters.id = this.extractRouteParamArray(params['id']);
    filter.filters.name = this.extractRouteParamArray(params['name']);
    filter.filters.label = this.extractRouteParamArray(params['label']);
    filter.filters.isTask = this.extractIsTaskParmArray(params['is-task']);

    this.zone.runGuarded(() => {
      this.filter = filter;
      this.dockerService.beat();
    });
  }


  private reduceToRouteParam(array: string[]): string {
    return array == null ? 'true' : array.reduce((cur, next) => {
      return cur == null ? next : cur + ',' + next
    }, null);
  }

  private extractRouteParamArray(param: string): string[] {
    if (param == null) {
      return [];
    }
    return param.split(',');
  }

  private extractIsTaskParmArray(param: string): boolean[] {
    if (param == null) {
      return null;
    }
    return param.split(',')
      .map(val => val === 'true');
  }

  getColumnLabel(column: ContainerColumn): string {
    return CONTAINER_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: ContainerColumn): string {
    return CONTAINER_COLUMN_DATA[column].field;
  }

  private initColumns() {
    return [
      ContainerColumn.ID,
      ContainerColumn.NAMES,
      ContainerColumn.IMAGE,
      ContainerColumn.COMMAND,
      ContainerColumn.STATE,
      ContainerColumn.STATUS,
      ContainerColumn.ACTIONS,
    ]
  }
}
