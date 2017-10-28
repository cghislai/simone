import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SecretFilter} from '../../client/domain/secret-filter';
import {SECRET_COLUMN_DATA, SecretColumn} from './secretColumn';
import {Secret} from '../../client/domain/secret';
import {Observable} from 'rxjs/Observable';
import {DockerSecretsService} from '../../services/docker-secrets.service';
import {DockerService} from '../../services/docker.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-secret-list',
  templateUrl: './secret-list.component.html',
  styleUrls: ['./secret-list.component.scss'],
})
export class SecretListComponent implements OnInit, OnChanges {

  @Input()
  filter: SecretFilter;
  @Input()
  columns: SecretColumn[];

  @Output()
  secretsChange = new EventEmitter<Secret[]>();

  secrets: Observable<Secret[]>;

  constructor(private dockerService: DockerService,
              private secretService: DockerSecretsService) {
  }

  ngOnInit() {
    let heartbeatTasks = this.dockerService.getHeartBeatObservable()
      .mergeMap(r => this.fetchSecrets());
    this.secrets = this.fetchSecrets()
      .concat(heartbeatTasks)
      .do(secrets => this.secretsChange.next(secrets))
      .share();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] != null) {
      this.dockerService.beat();
    }
  }


  getColumnLabel(column: SecretColumn): string {
    return SECRET_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: SecretColumn): string {
    return SECRET_COLUMN_DATA[column].field
  }

  private fetchSecrets() {
    return this.secretService.list(this.filter)
      .catch(e => Observable.of([]));
  }
}
