import {Component, OnDestroy, OnInit} from '@angular/core';
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

  private subscription: Subscription;


  constructor(private dockerService: DockerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private containerService: DockerContainersService) {
  }

  ngOnInit() {
    this.dockerService.ping();
    this.containers = this.dockerService.getReachableObservable()
      .filter(rechable => {
        return rechable === true;
      })
      .mergeMap(r => this.fetchContainers())
      .share();
    this.columns = [...CONTAINER_COLUMNS];
    this.columnOptions = CONTAINER_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: this.getColumnLabel(col),
      });
    this.filter = Object.assign({}, EMPTY_CONTAINER_FILTER);
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.onRouteParamsChange(params));
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onFilterChange(filter: ContainerFilter) {
    if (this.activatedRoute != null) {
      let params = {};
      params['include-stopped'] = filter.includeStopped;
      if (filter.filters.id.length > 0) {
        params['id'] = this.reduceToRouteParam(filter.filters.id);
      }
      if (filter.filters.name.length > 0) {
        params['name'] = this.reduceToRouteParam(filter.filters.name);
      }
      if (filter.filters.label.length > 0) {
        params['label'] = this.reduceToRouteParam(filter.filters.label);
      }
      if (filter.filters.isTask.length > 0) {
        params['is-task'] = this.reduceToRouteParam(filter.filters.isTask
          .map(p => p ? 'true' : 'false'));
      }
      console.log('navigatoin');
      this.router.navigate(['../', params], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
      });
    }
  }


  private onRouteParamsChange(params: Params) {
    let filter = Object.assign({}, this.filter);
    filter.includeStopped = params['include-stopped'] === true;
    filter.filters.id = this.extractRouteParamArray(params['id']);
    filter.filters.name = this.extractRouteParamArray(params['name']);
    filter.filters.label = this.extractRouteParamArray(params['label']);
    filter.filters.isTask = this.extractRouteParamArray(params['is-task'])
      .map(p => p === 'true');

    this.filter = filter;
    this.dockerService.ping();
  }

  fetchContainers() {
    return this.containerService.list(this.filter)
      .catch(e => Observable.of([]));
  }

  private reduceToRouteParam(array: string[]): string {
    return array == null ? null : array.reduce((cur, next) => {
      return cur == null ? next : cur + ',' + next
    }, null);
  }

  private extractRouteParamArray(param: string): string[] {
    if (param == null) {
      return [];
    }
    return param.split(',');
  }

  getColumnLabel(column: ContainerColumn): string {
    return CONTAINER_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: ContainerColumn): string {
    return CONTAINER_COLUMN_DATA[column].field;
  }

}
