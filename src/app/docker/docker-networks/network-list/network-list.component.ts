import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Network} from '../../client/domain/network';
import {NETWORK_COLUMN_DATA, NetworkColumn} from './network-column';
import {NetworkFilter} from '../../client/domain/network-filter';
import {Observable} from 'rxjs/Observable';
import {DockerNetworksService} from '../../services/docker-netwoks.service';
import {DockerService} from '../../services/docker.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/concat'

@Component({
  selector: 'app-network-list',
  templateUrl: './network-list.component.html',
  styleUrls: ['./network-list.component.scss'],
})
export class NetworkListComponent implements OnInit, OnChanges {


  @Input()
  filter: NetworkFilter;
  @Input()
  columns: NetworkColumn[];

  @Output()
  networksChange = new EventEmitter<Network[]>();

  networks: Observable<Network[]>;


  constructor(private dockerService: DockerService,
              private networksService: DockerNetworksService) {
  }

  ngOnInit() {
    let heartbeatTasks = this.dockerService.getHeartBeatObservable()
      .mergeMap(r => this.fetchNetworks());
    this.networks = Observable.concat(
      this.fetchNetworks(), heartbeatTasks)
      .do(networks => this.networksChange.next(networks))
      .share();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] != null) {
      this.dockerService.beat();
    }
  }


  getColumnLabel(column: NetworkColumn): string {
    return NETWORK_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: NetworkColumn): string {
    return NETWORK_COLUMN_DATA[column].field
  }

  private fetchNetworks() {
    return this.networksService.list(this.filter)
      .catch(e => Observable.of([]));
  }

}
