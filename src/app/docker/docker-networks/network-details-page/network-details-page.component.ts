import {Component, OnDestroy, OnInit} from '@angular/core';
import {Network} from '../../client/domain/network';
import {Subscription} from 'rxjs/Subscription';
import {DockerNetworksService} from '../../services/docker-netwoks.service';
import {ActivatedRoute} from '@angular/router';
import {DockerService} from '../../services/docker.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-network-details-page',
  templateUrl: './network-details-page.component.html',
  styleUrls: ['./network-details-page.component.scss'],
})
export class NetworkDetailsPageComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
  private id: number;
  private network: Network;


  constructor(private activatedRoute: ActivatedRoute,
              private networksService: DockerNetworksService,
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
      .subscribe(results => this.fetchNetwork(results[1]));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchNetwork(id: string) {
    this.networksService.inspect(id)
      .subscribe(network => this.network = network);
  }

}
