import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {DockerContainersService} from '../../services/docker-containers.service';
import {DockerService} from '../../services/docker.service';
import {Observable} from 'rxjs/Observable';
import {ContainerInspectInfo} from 'dockerode';

@Component({
  selector: 'app-container-details-page',
  templateUrl: './container-details-page.component.html',
  styleUrls: ['./container-details-page.component.scss'],
})
export class ContainerDetailsPageComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
  private id: number;
  private container: ContainerInspectInfo;

  constructor(private activatedRoute: ActivatedRoute,
              private containerservice: DockerContainersService,
              private dockerService: DockerService) {
  }

  ngOnInit() {
    let id = this.activatedRoute.params
      .filter(param => param != null)
      .map(params => params['id'])
      .filter(param => param != null)
      .distinctUntilChanged();
    let ping = this.dockerService.getReachableObservable();

    this.subscription = Observable.combineLatest(id, ping)
      .map(results => results[0])
      .subscribe(id => this.fetchContainer(id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchContainer(id: string) {
    this.containerservice.inspect(id)
      .subscribe(container => this.container = container);
  }

}
