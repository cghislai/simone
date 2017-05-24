import {Component, OnInit} from '@angular/core';
import {DockerService} from '../services/docker.service';
import {DockerServicesService} from '../services/docker-services.service';

@Component({
  selector: 'app-docker-dashboard',
  templateUrl: './docker-dashboard.component.html',
  styleUrls: ['./docker-dashboard.component.scss'],
})
export class DockerDashboardComponent implements OnInit {
  private info: any;
  private services: any;

  constructor(private dockerService: DockerService,
              private servicesService: DockerServicesService) {
  }

  ngOnInit() {
    this.dockerService.startClient();
  }

}
