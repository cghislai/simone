import {Component, OnInit} from '@angular/core';
import {Service} from '../../domain/services/service';
import {DockerService} from '../services/docker.service';
import {DockerServicesService} from '../services/docker-services.service';
import {Observable} from 'rxjs/Observable';
import {SERVICE_COLUMN_LABELS, SERVICE_COLUMNS, ServiceColumn} from './service-column';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-docker-service-list',
  templateUrl: './docker-service-list.component.html',
  styleUrls: ['./docker-service-list.component.scss'],
})
export class DockerServiceListComponent implements OnInit {


  services: Observable<Service[]>;
  columns: ServiceColumn[];
  columnOptions: SelectItem[];

  constructor(private dockerService: DockerService,
              private serviceService: DockerServicesService) {
  }

  ngOnInit() {
    this.services = this.dockerService.getPingResultObservable()
      .filter(r => r)
      .mergeMap(r => this.serviceService.list());
    this.columns = [...SERVICE_COLUMNS];
    this.columnOptions = SERVICE_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: this.getColumnLabel(col),
      });
  }

  getColumnLabel(column: ServiceColumn): string {
    return SERVICE_COLUMN_LABELS.en[column];
  }
}
