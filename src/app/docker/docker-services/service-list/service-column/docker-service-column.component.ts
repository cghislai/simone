import {Component, Input, OnInit} from '@angular/core';
import {ServiceColumn} from '../service-column';
import {Service} from '../../../domain/services/service';

@Component({
  selector: 'app-docker-service-column',
  templateUrl: './docker-service-column.component.html',
  styleUrls: ['./docker-service-column.component.scss'],
})
export class DockerServiceColumnComponent implements OnInit {

  @Input()
  column: ServiceColumn;
  @Input()
  service: Service;

  serviceColumn = ServiceColumn;

  constructor() {
  }

  ngOnInit() {
  }

}
