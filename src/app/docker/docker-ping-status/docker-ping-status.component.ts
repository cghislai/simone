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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(private service: DockerService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    let pingResult = this.service.getPingResultObservable();
    let started = this.service.getStartedObservable();
    this.active = Observable.combineLatest(pingResult, started)
      .map(results => {
        let isReachable = results[0];
        let isStarted = results[1];
        return isStarted ? (isReachable ? 'online' : 'unreachable') : 'offline';
      })
      .do(c => this.cd.detectChanges())
      .share();
    this.blink = this.service.getPingResultObservable()
      .do(c => this.cd.detectChanges())
      .map(s => Observable.timer(0, 100)
        .take(2)
        .map(r => r === 0))
      .mergeMap(r => r)
      .map(r => r ? 'noblink' : 'blink')
      .distinctUntilChanged()
      .do(c => this.cd.detectChanges())
      .share();
  }

}
