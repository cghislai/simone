import {Component, OnDestroy, OnInit} from '@angular/core';
import {Node} from '../../client/domain/node';
import {Subscription} from 'rxjs/Subscription';
import {DockerNodesService} from '../../services/docker-nodes.service';
import {ActivatedRoute} from '@angular/router';
import {DockerService} from '../../services/docker.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-node-details-page',
  templateUrl: './node-details-page.component.html',
  styleUrls: ['./node-details-page.component.scss'],
})
export class NodeDetailsPageComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
  private id: number;
  private node: Node;


  constructor(private activatedRoute: ActivatedRoute,
              private nodeService: DockerNodesService,
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
      .subscribe(results => this.fetchNode(results[1]));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchNode(id: string) {
    this.nodeService.inspect(id)
      .subscribe(node => this.node = node);
  }

}
