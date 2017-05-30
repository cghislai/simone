import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-container-status-icon',
  templateUrl: './container-status-icon.component.html',
  styleUrls: ['./container-status-icon.component.scss'],
})
export class ContainerStatusIconComponent implements OnInit, OnChanges {

  @Input()
  status: string;

  color: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let statusChange = changes['status'];
    if (statusChange != null) {
      this.color = this.getColor(statusChange.currentValue);
    }
  }


  private getColor(status) {
    switch (status) {
      case 'running':
        return 'green';
      case 'paused':
        return 'yellow';
      case 'stopped':
        return 'red';
      default:
        return 'gray';
    }
  }
}
