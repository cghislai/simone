import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DockerContainersService} from '../../services/docker-containers.service';

@Component({
  selector: 'app-container-restart-button',
  templateUrl: './container-restart-button.component.html',
  styleUrls: ['./container-restart-button.component.scss'],
})
export class ContainerRestartButtonComponent implements OnInit {

  @Input()
  containerId: string;
  @Input()
  running: boolean;
  @Output()
  restarted = new EventEmitter<boolean>();

  busy: boolean;

  constructor(private containerService: DockerContainersService) {
  }

  ngOnInit() {
  }

  restart() {
    this.restarted.next(false);
    this.containerService.restart(this.containerId)
      .subscribe(e => {
        this.busy = false;
        this.restarted.next(true);
      }, error => {
        this.busy = false;
      });
  }

}
