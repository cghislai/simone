import {Component, OnDestroy, OnInit} from '@angular/core';
import {Secret} from '../../client/domain/secret';
import {Subscription} from 'rxjs/Subscription';
import {DockerSecretsService} from '../../services/docker-secrets.service';
import {ActivatedRoute} from '@angular/router';
import {DockerService} from '../../services/docker.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-secret-details-page',
  templateUrl: './secret-details-page.component.html',
  styleUrls: ['./secret-details-page.component.scss'],
})
export class SecretDetailsPageComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
  private id: number;
  private secret: Secret;


  constructor(private activatedRoute: ActivatedRoute,
              private secretsService: DockerSecretsService,
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
      .subscribe(results => this.fetchSecret(results[1]));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchSecret(id: string) {
    this.secretsService.inspect(id)
      .subscribe(secret => this.secret = secret);
  }
}
