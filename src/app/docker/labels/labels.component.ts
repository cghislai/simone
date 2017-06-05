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
  @Input()
  expandable: boolean;
  @Input()
  short: boolean;

  expanded: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  getKeys() {
    if (this.labels == null) {
      return [];
    }
    return Reflect.ownKeys(this.labels);
  }

  getValue(key: string): string {
    if (this.labels == null) {
      return null;
    }
    return this.labels[key];
  }

  expand() {
    if (this.expandable) {
      this.expanded = true;
    }
  }

  onTooltip(event, panel) {
    if (this.tooltip) {
      panel.toggle(event);
    }
  }
}
