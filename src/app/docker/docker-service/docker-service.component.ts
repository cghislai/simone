import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../../domain/services/service';
import * as moment from 'moment';

@Component({
  selector: 'app-docker-service',
  templateUrl: './docker-service.component.html',
  styleUrls: ['./docker-service.component.scss'],
})
export class DockerServiceComponent implements OnInit {

  @Input()
  service: Service;

  constructor() {
  }

  ngOnInit() {
  }

  getCreatedSinceLabel() {
    return moment(this.service.createdAt).fromNow();
  }

  getUpdatedSinceLabel() {
    if (this.service.updatedAt == null) {
      return null;
    }
    return moment(this.service.updatedAt).fromNow();
  }

}
