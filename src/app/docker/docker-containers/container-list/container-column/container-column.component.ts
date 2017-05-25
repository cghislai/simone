import {Component, Input, OnInit} from '@angular/core';
import {CONTAINER_COLUMN_DATA, ContainerColumn} from '../container-column';
import {Container} from '../../../domain/containers/container';
import {ColumnData} from '../../../domain/column-data';

@Component({
  selector: 'app-container-column',
  templateUrl: './container-column.component.html',
  styleUrls: ['./container-column.component.scss'],
})
export class ContainerColumnComponent implements OnInit {


  @Input()
  column: ContainerColumn;
  @Input()
  container: Container;

  containerColumn = ContainerColumn;
  columnData: ColumnData;

  constructor() {
  }

  ngOnInit() {
    this.columnData = CONTAINER_COLUMN_DATA[this.column];
  }

}
