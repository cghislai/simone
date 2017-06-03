import {Component, Input, OnInit} from '@angular/core';
import {ColumnData} from '../../../domain/column-data';
import {VOLUME_COLUMN_DATA, VolumeColumn} from '../volume-column';
import {Volume} from '../../../client/domain/volume';

@Component({
  selector: 'app-volume-column',
  templateUrl: './volume-column.component.html',
  styleUrls: ['./volume-column.component.scss'],
})
export class VolumeColumnComponent implements OnInit {


  @Input()
  column: VolumeColumn;
  @Input()
  volume: Volume;

  volumeColumn = VolumeColumn;
  columnData: ColumnData;

  constructor() {
  }

  ngOnInit() {
    this.columnData = VOLUME_COLUMN_DATA[this.column];
  }

}
