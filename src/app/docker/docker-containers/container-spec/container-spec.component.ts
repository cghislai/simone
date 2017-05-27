import {Component, Input, OnInit} from '@angular/core';
import {ContainerSpecJson} from '../../../client/domain/container-spec';

@Component({
  selector: 'app-container-spec',
  templateUrl: './container-spec.component.html',
  styleUrls: ['./container-spec.component.scss']
})
export class ContainerSpecComponent implements OnInit {

  @Input()
  spec: ContainerSpecJson;

  constructor() { }

  ngOnInit() {
  }

}
