import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {VolumeFilter} from '../../client/domain/volume-filter';
import {VOLUME_COLUMN_DATA, VolumeColumn} from './volume-column';
import {Volume} from '../../client/domain/volume';
import {DockerVolumesService} from '../../services/docker-volumes.service';
import {DockerService} from '../../services/docker.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-volume-list',
  templateUrl: './volume-list.component.html',
  styleUrls: ['./volume-list.component.scss'],
})
export class VolumeListComponent implements OnInit, OnChanges {


  @Input()
  filter: VolumeFilter;
  @Input()
  columns: VolumeColumn[];

  @Output()
  volumesChange = new EventEmitter<Volume[]>();

  volumes: Observable<Volume[]>;


  constructor(private dockerService: DockerService,
              private volumeService: DockerVolumesService) {
  }

  ngOnInit() {
    let heartbeatVolumes = this.dockerService.getHeartBeatObservable()
      .mergeMap(r => this.fetchVolumes());
    this.volumes = this.fetchVolumes()
      .concat(heartbeatVolumes)
      .do(tasks => this.volumesChange.next(tasks))
      .share();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] != null) {
      this.dockerService.beat();
    }
  }


  getColumnLabel(column: VolumeColumn): string {
    return VOLUME_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: VolumeColumn): string {
    return VOLUME_COLUMN_DATA[column].field
  }

  private fetchVolumes() {
    return this.volumeService.list(this.filter)
      .catch(e => Observable.of([]));
  }

}
