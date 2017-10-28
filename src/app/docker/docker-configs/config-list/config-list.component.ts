import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfigFilter} from '../../client/domain/config-filter';
import {CONFIG_COLUMN_DATA, ConfigColumn} from './configColumn';
import {Config} from '../../client/domain/config';
import {Observable} from 'rxjs/Observable';
import {DockerConfigsService} from '../../services/docker-configs.service';
import {DockerService} from '../../services/docker.service';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.scss'],
})
export class ConfigListComponent implements OnInit, OnChanges {

  @Input()
  filter: ConfigFilter;
  @Input()
  columns: ConfigColumn[];

  @Output()
  configsChange = new EventEmitter<Config[]>();

  configs: Observable<Config[]>;

  constructor(private dockerService: DockerService,
              private configService: DockerConfigsService) {
  }

  ngOnInit() {
    let heartbeatTasks = this.dockerService.getHeartBeatObservable()
      .mergeMap(r => this.fetchConfigs());
    this.configs = this.fetchConfigs()
      .concat(heartbeatTasks)
      .do(configs => this.configsChange.next(configs))
      .share();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] != null) {
      this.dockerService.beat();
    }
  }


  getColumnLabel(column: ConfigColumn): string {
    return CONFIG_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: ConfigColumn): string {
    return CONFIG_COLUMN_DATA[column].field
  }

  private fetchConfigs() {
    return this.configService.list(this.filter)
      .catch(e => Observable.of([]));
  }
}
