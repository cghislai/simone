import {Component, Input, OnInit} from '@angular/core';
import {ContainerInspectInfo} from '../../client/domain/container-inspect-info';

@Component({
  selector: 'app-container-inspect-info',
  templateUrl: './container-inspect-info.component.html',
  styleUrls: ['./container-inspect-info.component.scss']
})
export class ContainerInspectInfoComponent implements OnInit {

  @Input()
  container : ContainerInspectInfo;

  constructor() { }

  ngOnInit() {
  }

}
