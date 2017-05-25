import {Component, OnInit} from '@angular/core';
import {DockerService} from '../services/docker.service';

@Component({
  selector: 'app-docker-route',
  templateUrl: './docker-route.component.html',
  styleUrls: ['./docker-route.component.scss'],
})
export class DockerRouteComponent implements OnInit {

  constructor(private dockerService: DockerService) {
  }

  ngOnInit() {
    this.dockerService.startClient();
  }

}
