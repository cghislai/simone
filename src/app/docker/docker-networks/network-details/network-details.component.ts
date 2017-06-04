import {Component, Input, OnInit} from '@angular/core';
import {Network} from '../../client/domain/network';

@Component({
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.scss'],
})
export class NetworkDetailsComponent implements OnInit {


  @Input()
  network: Network;

  constructor() {
  }

  ngOnInit() {
  }

  getContainerKeys(): string[] {
    if (this.network.Containers == null) {
      return [];
    }
    return Reflect.ownKeys(this.network.Containers)
      .filter(key => typeof key === 'string')
      .map(key => <string>key);
  }

}
