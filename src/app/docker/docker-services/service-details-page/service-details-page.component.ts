import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {DockerService} from '../../services/docker.service';
import {Observable} from 'rxjs/Observable';
import {DockerServicesService} from '../../services/docker-services.service';
import {Service} from '../../domain/services/service';

@Component({
  selector: 'app-service-details-page',
  templateUrl: './service-details-page.component.html',
  styleUrls: ['./service-details-page.component.scss'],
})
export class ServiceDetailsPageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private id: number;
  private service: Service;

  constructor(private activatedRoute: ActivatedRoute,
              private servicesService: DockerServicesService,
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
      .subscribe(id => this.fetchService(id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchService(id: string) {
    this.servicesService.inspect(id)
      .subscribe(service => this.service = service);
  }

}