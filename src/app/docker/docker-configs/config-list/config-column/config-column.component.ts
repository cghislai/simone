import {Component, Input, OnInit} from '@angular/core';
import {CONFIG_COLUMN_DATA, ConfigColumn} from '../configColumn';
import {Config} from '../../../client/domain/config';
import {ColumnData} from '../../../domain/column-data';

@Component({
  selector: 'app-config-column',
  templateUrl: './config-column.component.html',
  styleUrls: ['./config-column.component.scss'],
})
export class ConfigColumnComponent implements OnInit {


  @Input()
  column: ConfigColumn;
  @Input()
  config: Config;

  configColumns = ConfigColumn;
  columnData: ColumnData;

  constructor() {
  }

  ngOnInit() {
    this.columnData = CONFIG_COLUMN_DATA[this.column];
  }
}
