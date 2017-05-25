import {Component, OnInit} from '@angular/core';
import {Service} from '../../domain/services/service';
import {Observable} from 'rxjs/Observable';
import {SERVICE_COLUMNS, ServiceColumn, SERVICES_COLUMN_DATA} from './service-column';
import {SelectItem} from 'primeng/primeng';
import {DockerService} from '../../services/docker.service';
import {DockerServicesService} from '../../services/docker-services.service';
import {ServiceFilter} from '../../domain/services/service-filter';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-docker-service-list',
  templateUrl: './docker-service-list.component.html',
  styleUrls: ['./docker-service-list.component.scss'],
})
export class DockerServiceListComponent implements OnInit {


  services: Observable<Service[]>;
  columns: ServiceColumn[];
  columnOptions: SelectItem[];
  filter: ServiceFilter;

  constructor(private dockerService: DockerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private serviceService: DockerServicesService) {
  }

  ngOnInit() {
    this.dockerService.ping();
    this.services = this.dockerService.getPingResultObservable()
      .filter(rechable => rechable)
      .mergeMap(r => this.onHeartbeat());
    this.columns = [...SERVICE_COLUMNS];
    this.columnOptions = SERVICE_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: this.getColumnLabel(col),
      });
    this.filter = {id: [], label: [], name: []};
    this.activatedRoute.params
      .subscribe(params => this.onRouteParamsChange(params));
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
    var touched = false;
    filter.id = this.extractRouteParam(params['id']);
    filter.name = this.extractRouteParam(params['name']);
    filter.label = this.extractRouteParam(params['label']);

    this.filter = filter;
    this.dockerService.ping();
  }

  private onHeartbeat() {
    return this.serviceService.list(this.filter);
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
