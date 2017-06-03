import {Component, Input, OnInit} from '@angular/core';
import {PortBinding} from '../client/domain/port-binding';

@Component({
  selector: 'app-port-mappings',
  templateUrl: './port-mappings.component.html',
  styleUrls: ['./port-mappings.component.scss'],
})
export class PortMappingsComponent implements OnInit {

  @Input()
  ports: PortBinding[];

  constructor() {
  }

  ngOnInit() {
  }

}
