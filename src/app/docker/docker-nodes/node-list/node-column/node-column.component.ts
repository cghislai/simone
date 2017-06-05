import {Component, Input, OnInit} from '@angular/core';
import {NODE_COLUMN_DATA, NodeColumn} from '../node-column';
import {ColumnData} from '../../../domain/column-data';

@Component({
  selector: 'app-node-column',
  templateUrl: './node-column.component.html',
  styleUrls: ['./node-column.component.scss'],
})
export class NodeColumnComponent implements OnInit {

  @Input()
  column: NodeColumn;
  @Input()
  node: Node;

  nodeColumns = NodeColumn;
  columnData: ColumnData;

  constructor() {
  }

  ngOnInit() {
    this.columnData = NODE_COLUMN_DATA[this.column];
  }

}
