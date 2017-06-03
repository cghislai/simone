import {Component, Input, OnInit} from '@angular/core';
import {SECRET_COLUMN_DATA, SecretColumn} from '../secretColumn';
import {Secret} from '../../../client/domain/secret';
import {ColumnData} from '../../../domain/column-data';

@Component({
  selector: 'app-secret-column',
  templateUrl: './secret-column.component.html',
  styleUrls: ['./secret-column.component.scss'],
})
export class SecretColumnComponent implements OnInit {


  @Input()
  column: SecretColumn;
  @Input()
  secret: Secret;

  secretColumns = SecretColumn;
  columnData: ColumnData;

  constructor() {
  }

  ngOnInit() {
    this.columnData = SECRET_COLUMN_DATA[this.column];
  }
}
