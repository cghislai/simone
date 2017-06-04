import {Component, Input, OnInit} from '@angular/core';
import {NETWORK_COLUMN_DATA, NetworkColumn} from '../network-column';
import {Network} from '../../../client/domain/network';
import {ColumnData} from '../../../domain/column-data';

@Component({
  selector: 'app-network-column',
  templateUrl: './network-column.component.html',
  styleUrls: ['./network-column.component.scss'],
})
export class NetworkColumnComponent implements OnInit {

  @Input()
  column: NetworkColumn;
  @Input()
  network: Network;

  networkColumns = NetworkColumn;
  columnData: ColumnData;


  constructor() {
  }

  ngOnInit() {
    this.columnData = NETWORK_COLUMN_DATA[this.column];
  }

  getContainerIds() {
    if (this.network.Containers == null) {
      return [];
    }
    return Reflect.ownKeys(this.network.Containers);
  }
}
