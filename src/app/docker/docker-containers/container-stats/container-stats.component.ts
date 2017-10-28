import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {DockerContainersService} from '../../services/docker-containers.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {ContainerStats} from '../../client/domain/container-stats';

@Component({
  selector: 'app-container-stats',
  templateUrl: './container-stats.component.html',
  styleUrls: ['./container-stats.component.scss'],
})
export class ContainerStatsComponent implements OnInit, OnDestroy {

  @Input()
  private containerId: string;

  private source = new BehaviorSubject<ContainerStats>(null);
  private statsSubscription: Subscription;
  data: Observable<ContainerStats>;

  constructor(private containerService: DockerContainersService,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.data = this.source.asObservable().share();
    this.initConnection();
  }

  ngOnDestroy() {
    if (this.statsSubscription != null) {
      this.statsSubscription.unsubscribe();
    }
  }

  private initConnection() {
    this.statsSubscription = this.containerService.stats(this.containerId, {
      stream: true,
    }).subscribe(stats => {
      this.source.next(stats);
    });
  }

}
