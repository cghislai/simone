import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Volume} from '../../client/domain/volume';
import {DockerService} from '../../services/docker.service';
import {DockerVolumesService} from '../../services/docker-volumes.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-volume-details-page',
  templateUrl: './volume-details-page.component.html',
  styleUrls: ['./volume-details-page.component.scss'],
})
export class VolumeDetailsPageComponent implements OnInit {


  private subscription: Subscription;
  private id: number;
  private volume: Volume;

  constructor(private activatedRoute: ActivatedRoute,
              private volumeService: DockerVolumesService,
              private dockerService: DockerService) {
  }

  ngOnInit() {
    let id = this.activatedRoute.params
      .filter(param => param != null)
      .map(params => params['id'])
      .filter(param => param != null)
      .distinctUntilChanged();

    let heartbeats = Observable.of(true)
      .concat(this.dockerService.getHeartBeatObservable());
    this.subscription = heartbeats.combineLatest(id)
      .subscribe(results => this.fetchVolume(results[1]));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchVolume(id: string) {
    this.volumeService.inspect(id)
      .subscribe(vol => this.volume = vol);
  }


}
