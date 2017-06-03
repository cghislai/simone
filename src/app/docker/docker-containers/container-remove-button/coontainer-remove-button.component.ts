import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {DockerContainersService} from '../../services/docker-containers.service';
import {ContainerRemoveOptions} from '../../client/domain/container-remove-options';

@Component({
  selector: 'app-container-remove-button',
  templateUrl: './container-remove-button.component.html',
  styleUrls: ['./container-remove-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContainerRemoveButtonComponent implements OnInit {

  @Input()
  private containerId: string;
  @Output()
  private containerChange = new EventEmitter<boolean>();

  volumes: boolean;
  links: boolean;
  force: boolean;
  busy: boolean;

  constructor(private containerService: DockerContainersService) {
  }

  ngOnInit() {
  }

  remove() {
    let options: ContainerRemoveOptions = {
      force: this.force,
      link: this.links,
      v: this.volumes,
    };
    this.busy = true;
    this.containerService.remove(this.containerId, options)
      .subscribe(r => {
        this.busy = false;
        this.containerChange.next(true);
      }, e => this.busy = false);
  }
}
