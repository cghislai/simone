import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Config} from '../../client/domain/config';

@Component({
  selector: 'app-config-details',
  templateUrl: './config-details.component.html',
  styleUrls: ['./config-details.component.scss'],
})
export class ConfigDetailsComponent implements OnInit, OnChanges {


  @Input()
  config: Config;

  data: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.decodeData(this.config.Spec.Data);
    }
  }

  private decodeData(data: string) {
    let base64Decoded = atob(data);
    let URLDecoded = decodeURI(base64Decoded);
    this.data = URLDecoded;
  }
}
