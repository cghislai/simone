import {Component, Input, OnInit} from '@angular/core';
import {ServiceMode} from '../../../domain/services/service-mode';

@Component({
  selector: 'app-service-mode',
  templateUrl: './service-mode.component.html',
  styleUrls: ['./service-mode.component.scss'],
})
export class ServiceModeComponent implements OnInit {

  @Input()
  mode: ServiceMode;

  serviceMode = ServiceMode;

  constructor() {
  }

  ngOnInit() {
  }

}
