import {Component, Input, OnInit} from '@angular/core';
import {Volume} from '../../client/domain/volume';

@Component({
  selector: 'app-volume-details',
  templateUrl: './volume-details.component.html',
  styleUrls: ['./volume-details.component.scss'],
})
export class VolumeDetailsComponent implements OnInit {


  @Input()
  volume: Volume;

  constructor() {
  }

  ngOnInit() {
  }

}
