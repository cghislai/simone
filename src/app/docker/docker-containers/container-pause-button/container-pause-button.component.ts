import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DockerContainersService} from '../../services/docker-containers.service';

@Component({
  selector: 'app-container-pause-button',
  templateUrl: './container-pause-button.component.html',
  styleUrls: ['./container-pause-button.component.scss'],
})
export class ContainerPauseButtonComponent implements OnInit {

  @Input()
  containerId: string;
  @Input()
  paused: boolean;
  @Output()
  pausedChanged = new EventEmitter<boolean>();

  private busy: boolean;

  constructor(private containerService: DockerContainersService) {
  }

  ngOnInit() {
  }

  pause() {
    this.busy = true;
    this.containerService.pause(this.containerId)
      .subscribe(e => {
        this.busy = false;
        this.paused = true;
        this.pausedChanged.next(true);
      }, error => {
        this.busy = false;
      });
  }

  resume() {
    this.busy = true;
    this.containerService.resume(this.containerId)
      .subscribe(e => {
        this.busy = false;
        this.paused = false;
        this.pausedChanged.next(false);
      }, error => {
        this.busy = false;
      });
  }

}
