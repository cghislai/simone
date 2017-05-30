import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DockerContainersService} from '../../services/docker-containers.service';

@Component({
  selector: 'app-container-stop-button',
  templateUrl: './container-stop-button.component.html',
  styleUrls: ['./container-stop-button.component.scss'],
})
export class ContainerStopButtonComponent implements OnInit {

  @Input()
  private containerId: string;
  @Input()
  running: boolean;
  @Output()
  private runningChange = new EventEmitter<any>();

  busy: boolean;

  constructor(private containerService: DockerContainersService) {
  }

  ngOnInit() {
  }


  start() {
    this.busy = true;
    this.containerService.start(this.containerId)
      .subscribe(e => {
        this.busy = false;
        this.running = true;
        this.runningChange.next(true);
      }, error => {
        this.busy = false;
      });
  }

  stop() {
    this.busy = true;
    this.containerService.stop(this.containerId)
      .subscribe(e => {
        this.busy = false;
        this.running = false;
        this.runningChange.next(false);
      }, error => {
        this.busy = false;
      });
  }

}
