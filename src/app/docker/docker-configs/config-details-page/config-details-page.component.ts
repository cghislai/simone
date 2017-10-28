import {Component, OnDestroy, OnInit} from '@angular/core';
import {Config} from '../../client/domain/config';
import {Subscription} from 'rxjs/Subscription';
import {DockerConfigsService} from '../../services/docker-configs.service';
import {ActivatedRoute} from '@angular/router';
import {DockerService} from '../../services/docker.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-config-details-page',
  templateUrl: './config-details-page.component.html',
  styleUrls: ['./config-details-page.component.scss'],
})
export class ConfigDetailsPageComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
  private id: number;
  private config: Config;


  constructor(private activatedRoute: ActivatedRoute,
              private configsService: DockerConfigsService,
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
      .subscribe(results => this.fetchConfig(results[1]));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchConfig(id: string) {
    this.configsService.inspect(id)
      .subscribe(config => this.config = config);
  }
}
