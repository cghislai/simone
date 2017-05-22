import {Component, OnInit} from '@angular/core';
import {DockerService} from '../services/docker.service';
import {Observable} from 'rxjs';
import {SimoneDockerOptions} from '../../domain/docker-options';
import {DockerOptionsService} from '../services/docker-options.service';

@Component({
  selector: 'app-docker-options-page',
  templateUrl: './docker-options-page.component.html',
  styleUrls: ['./docker-options-page.component.css'],
})
export class DockerOptionsPageComponent implements OnInit {

  private reachable: Observable<boolean>;
  private running: Observable<boolean>;
  private info: any;

  constructor(private dockerService: DockerService,
              private optionsService: DockerOptionsService) {
  }

  ngOnInit() {
  }

  onOptionsChange(options: SimoneDockerOptions) {
    this.optionsService.setOptions(options);
    this.dockerService.startClient();
    this.reachable = this.dockerService.isReachable();
    this.running = this.dockerService.isStarted();
  }

  onStop() {
    this.dockerService.stopClient();
  }

  onInfo() {
    this.dockerService.info()
      .subscribe(info=>this.info = info);
  }
}
