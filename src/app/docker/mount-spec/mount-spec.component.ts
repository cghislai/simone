import {Component, Input, OnInit} from '@angular/core';
import {MountSpec} from '../client/domain/mount-spec';

@Component({
  selector: 'app-mount-spec',
  templateUrl: './mount-spec.component.html',
  styleUrls: ['./mount-spec.component.scss'],
})
export class MountSpecComponent implements OnInit {

  @Input()
  mountSpec: MountSpec;
  @Input()
  showOptions: boolean;
  @Input()
  showType: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
