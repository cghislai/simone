import {Component, OnInit} from '@angular/core';
import {DockerService} from '../services/docker.service';

@Component({
  selector: 'app-docker-dashboard',
  templateUrl: './docker-dashboard.component.html',
  styleUrls: ['./docker-dashboard.component.scss'],
})
export class DockerDashboardComponent implements OnInit {
  private info: any;

  constructor(private dockerService: DockerService) {
  }

  ngOnInit() {
  }

  onInfo() {
    this.dockerService.info()
      .subscribe(info => this.info = info);
  }
}
