import {Component, OnDestroy, OnInit} from '@angular/core';
import {Service} from '../../domain/services/service';
import {Observable} from 'rxjs/Observable';
import {SERVICE_COLUMNS, ServiceColumn, SERVICES_COLUMN_DATA} from './service-column';
import {SelectItem} from 'primeng/primeng';
import {DockerService} from '../../services/docker.service';
import {DockerServicesService} from '../../services/docker-services.service';
import {ServiceFilter} from '../../domain/services/service-filter';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {DockerStacksService} from '../../services/docker-stacks.service';

@Component({
  selector: 'app-docker-service-list',
  templateUrl: './docker-service-list.component.html',
  styleUrls: ['./docker-service-list.component.scss'],
})
export class DockerServiceListComponent implements OnInit, OnDestroy {


  services: Observable<Service[]>;
  stacks: Observable<string[]>;
  columns: ServiceColumn[];
  columnOptions: SelectItem[];
  filter: ServiceFilter;

  private routeSubscription: Subscription;

  constructor(private dockerService: DockerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private serviceService: DockerServicesService,
              private stackService: DockerStacksService) {
  }

  ngOnInit() {
    let heartbeatServices = this.dockerService.getHeartBeatObservable()
      .mergeMap(r => this.fetchServices());
    this.initDefaultColumns();
    this.columnOptions = SERVICE_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: this.getColumnLabel(col),
      });
    this.filter = {id: [], label: [], name: []};
    this.routeSubscription = this.activatedRoute.params
      .subscribe(params => this.onRouteParamsChange(params));
    this.services = this.fetchServices()
      .concat(heartbeatServices)
      .share();
    this.stacks = this.services
      .map(services => this.stackService.extractServicesStackNames(services))
      .share();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onFilterChange(filter: ServiceFilter) {
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
      this.router.navigate(['../', params], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
      });
    }
  }

  getColumnLabel(column: ServiceColumn): string {
    return SERVICES_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: ServiceColumn): string {
    return SERVICES_COLUMN_DATA[column].field;
  }

  private onRouteParamsChange(params: Params) {
    let filter = Object.assign({}, this.filter);
    filter.id = this.extractRouteParamArray(params['id']);
    filter.name = this.extractRouteParamArray(params['name']);
    filter.label = this.extractRouteParamArray(params['label']);

    this.filter = filter;
    this.dockerService.beat();
  }

  private fetchServices() {
    return this.serviceService.list(this.filter)
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

  private initDefaultColumns() {
    this.columns = [
      ServiceColumn.ID,
      ServiceColumn.NAME,
      ServiceColumn.IMAGE,
      ServiceColumn.MODE,
      ServiceColumn.REPLICAS,
      ServiceColumn.PORTS,
      ServiceColumn.UPDATE_STATUS,
    ];
  }

}
