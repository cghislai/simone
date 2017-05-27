import {
  animate,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  state,
  style,
  transition,
  trigger,
} from '@angular/core';
import {DockerService} from '../services/docker.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-docker-ping-status',
  templateUrl: './docker-ping-status.component.html',
  styleUrls: ['./docker-ping-status.component.scss'],
  animations: [
    trigger('blink', [
      state('noblink', style({
        transform: '*',
      })),
      state('blink', style({
        transform: 'scale(1.2)',
      })),
      transition('blink => noblink', animate('100ms ease-out')),
    ]),
    trigger('active', [
      state('offline', style({
        backgroundColor: 'lightgray',
      })),
      state('unreachable', style({
        backgroundColor: 'red',
      })),
      state('online', style({
        backgroundColor: 'green',
      })),
    ]),
  ],
})

export class DockerPingStatusComponent implements OnInit {

  blink: Observable<string>;
  active: Observable<string>;
  busy: Observable<boolean>;

  constructor(private service: DockerService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    let pingResult = this.service.getReachableObservable();
    let started = this.service.getStartedObservable();
    this.active = Observable.combineLatest(pingResult, started)
      .map(results => {
        let isReachable = results[0];
        let isStarted = results[1];
        return isStarted ? (isReachable ? 'online' : 'unreachable') : 'offline';
      });
    this.blink = this.service.getReachableObservable()
      // .do(c => this.cd.detectChanges())
      .mergeMap(s => Observable.timer(0, 100)
        .take(2)
        .map(r => r === 0))
      .map(r => r ? 'blink' : 'noblink')
      .share();
    this.busy = this.service.getBusyObservable();
  }

}
