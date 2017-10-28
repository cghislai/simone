import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigFilter} from '../../client/domain/config-filter';
import {CONFIG_COLUMN_DATA, CONFIG_COLUMNS, ConfigColumn} from '../config-list/configColumn';
import {SelectItem} from 'primeng/primeng';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DockerService} from '../../services/docker.service';
import {Subscription} from 'rxjs/Subscription';
import {Config} from '../../client/domain/config';

@Component({
  selector: 'app-config-list-page',
  templateUrl: './config-list-page.component.html',
  styleUrls: ['./config-list-page.component.scss'],
})
export class ConfigListPageComponent implements OnInit, OnDestroy {

  filter: ConfigFilter;
  columns: ConfigColumn[];
  columnOptions: SelectItem[];
  configCount: number = 0;

  private subscription: Subscription;

  constructor(private dockerService: DockerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }


  ngOnInit() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.onRouteParamsChange(params));
    this.dockerService.beat();
    this.filter = {names: []};
    this.columns = [...CONFIG_COLUMNS];
    this.columnOptions = CONFIG_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: CONFIG_COLUMN_DATA[col].label['en'],
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFilterChange(filter: ConfigFilter) {
    if (this.activatedRoute != null) {
      let params = {};
      if (filter.names.length > 0) {
        params['names'] = this.reduceToRouteParam(filter.names);
      }
      this.router.navigate(['../', params], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
      });
    }
  }

  onConfigsChange(configs: Config[]) {
    this.configCount = configs.length;
  }


  private onRouteParamsChange(params: Params) {
    let filter = Object.assign({}, this.filter);
    filter.names = this.extractRouteParam(params['names']);

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
}
