import {Component, Input, OnInit} from '@angular/core';
import {NetworkConfig} from '../../../client/domain/network-config';

@Component({
  selector: 'app-network-config',
  templateUrl: './network-config.component.html',
  styleUrls: ['./network-config.component.scss']
})
export class NetworkConfigComponent implements OnInit {

  @Input()
  private config: NetworkConfig;

  constructor() { }

  ngOnInit() {
  }

}
