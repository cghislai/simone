import {Component, OnDestroy, OnInit} from '@angular/core';
import {VolumeFilter} from '../../client/domain/volume-filter';
import {VOLUME_COLUMN_DATA, VOLUME_COLUMNS, VolumeColumn} from '../volume-list/volume-column';
import {SelectItem} from 'primeng/primeng';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DockerService} from '../../services/docker.service';
import {Subscription} from 'rxjs/Subscription';
import {Volume} from '../../client/domain/volume';

@Component({
  selector: 'app-volume-list-page',
  templateUrl: './volume-list-page.component.html',
  styleUrls: ['./volume-list-page.component.scss'],
})
export class VolumeListPageComponent implements OnInit, OnDestroy {

  filter: VolumeFilter;
  columns: VolumeColumn[];
  columnOptions: SelectItem[];
  volumeCount: number = 0;

  private subscription: Subscription;


  constructor(private dockerService: DockerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.onRouteParamsChange(params));
    this.dockerService.beat();
    this.filter = {dangling: [], label: [], name: [], driver: []};
    this.columns = [...VOLUME_COLUMNS];
    this.columnOptions = VOLUME_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: VOLUME_COLUMN_DATA[col].label['en'],
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onFilterChange(filter: VolumeFilter) {
    if (this.activatedRoute != null) {
      let params = {};
      if (filter.name.length > 0) {
        params['name'] = this.reduceToRouteParam(filter.name);
      }
      if (filter.label.length > 0) {
        params['label'] = this.reduceToRouteParam(filter.label);
      }
      if (filter.driver.length > 0) {
        params['driver'] = this.reduceToRouteParam(filter.driver);
      }
      if (filter.dangling.length > 0) {
        params['dangling'] = this.reduceToRouteParam(filter.dangling
          .map(f => f ? 'true' : 'false'));
      }
      this.router.navigate(['../', params], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
      });
    }
  }


  onVolumesChange(volumes: Volume[]) {
    this.volumeCount = volumes.length;
  }


  private onRouteParamsChange(params: Params) {
    let filter = Object.assign({}, this.filter);
    filter.name = this.extractRouteParam(params['name']);
    filter.label = this.extractRouteParam(params['label']);
    filter.driver = this.extractRouteParam(params['driver']);
    filter.dangling = this.extractRouteParam(params['dangling'])
      .map(f => f === 'true');

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
