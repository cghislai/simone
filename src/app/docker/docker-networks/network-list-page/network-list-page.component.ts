import {Component, OnDestroy, OnInit} from '@angular/core';
import {NetworkFilter} from '../../client/domain/network-filter';
import {NETWORK_COLUMN_DATA, NETWORK_COLUMNS, NetworkColumn} from '../network-list/network-column';
import {SelectItem} from 'primeng/primeng';
import {Subscription} from 'rxjs/Subscription';
import {DockerService} from '../../services/docker.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Network} from '../../client/domain/network';

@Component({
  selector: 'app-network-list-page',
  templateUrl: './network-list-page.component.html',
  styleUrls: ['./network-list-page.component.scss'],
})
export class NetworkListPageComponent implements OnInit, OnDestroy {


  filter: NetworkFilter;
  columns: NetworkColumn[];
  columnOptions: SelectItem[];
  networksCount: number = 0;

  private subscription: Subscription;

  constructor(private dockerService: DockerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.onRouteParamsChange(params));
    this.dockerService.beat();
    this.filter = {label: [], type: ['custom', 'builtin'], id: [], name: [], driver: []};
    this.initDefaultColumns();
    this.columnOptions = NETWORK_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: NETWORK_COLUMN_DATA[col].label['en'],
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFilterChange(filter: NetworkFilter) {
    if (this.activatedRoute != null) {
      let params = {};
      if (filter.driver.length > 0) {
        params['driver'] = this.reduceToRouteParam(filter.driver);
      }
      if (filter.name.length > 0) {
        params['name'] = this.reduceToRouteParam(filter.name);
      }
      if (filter.id.length > 0) {
        params['id'] = this.reduceToRouteParam(filter.id);
      }
      if (filter.type.length > 0) {
        params['type'] = this.reduceToRouteParam(filter.type);
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

  onNetworksChange(networks: Network[]) {
    this.networksCount = networks.length;
  }


  private onRouteParamsChange(params: Params) {
    let filter = Object.assign({}, this.filter);
    filter.driver = this.extractRouteParam(params['driver']);
    filter.label = this.extractRouteParam(params['label']);
    filter.type = <('custom' | 'builtin')[]>this.extractRouteParam(params['type']);
    filter.id = this.extractRouteParam(params['id']);
    filter.name = this.extractRouteParam(params['name']);

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

  private initDefaultColumns() {
    this.columns = [
      NetworkColumn.ID,
      NetworkColumn.NAME,
      NetworkColumn.DRIVER,
      NetworkColumn.SCOPE,
      NetworkColumn.ATTACHABLE,
    ];
  }
}
