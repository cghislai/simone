import {Component, Input, OnInit} from '@angular/core';
import {ServiceColumn, SERVICES_COLUMN_DATA} from '../service-column';
import {Service} from '../../../domain/services/service';
import {ColumnData} from '../../../domain/column-data';

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
  columnData: ColumnData;

  constructor() {
  }

  ngOnInit() {
    this.columnData = SERVICES_COLUMN_DATA[this.column];
  }

}
