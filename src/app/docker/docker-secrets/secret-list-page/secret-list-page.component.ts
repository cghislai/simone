import {Component, OnDestroy, OnInit} from '@angular/core';
import {SecretFilter} from '../../client/domain/secret-filter';
import {SECRET_COLUMN_DATA, SECRET_COLUMNS, SecretColumn} from '../secret-list/secretColumn';
import {SelectItem} from 'primeng/primeng';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DockerService} from '../../services/docker.service';
import {Subscription} from 'rxjs/Subscription';
import {Secret} from '../../client/domain/secret';

@Component({
  selector: 'app-secret-list-page',
  templateUrl: './secret-list-page.component.html',
  styleUrls: ['./secret-list-page.component.scss'],
})
export class SecretListPageComponent implements OnInit, OnDestroy {

  filter: SecretFilter;
  columns: SecretColumn[];
  columnOptions: SelectItem[];
  secretCount: number = 0;

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
    this.columns = [...SECRET_COLUMNS];
    this.columnOptions = SECRET_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: SECRET_COLUMN_DATA[col].label['en'],
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFilterChange(filter: SecretFilter) {
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

  onSecretsChange(secrets: Secret[]) {
    this.secretCount = secrets.length;
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
