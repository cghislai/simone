import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LabelsComponent implements OnInit {

  @Input()
  labels: { [key: string]: string };
  @Input()
  tooltip: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  getKeys() {
    return Reflect.ownKeys(this.labels);
  }

  getValue(key: string): string {
    return this.labels[key];
  }

  onTooltip(event, panel) {
    if (this.tooltip) {
      panel.toggle(event);
    }
  }
}
