import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Task} from '../../domain/tasks/task';

@Component({
  selector: 'app-task-status-icon',
  templateUrl: './task-status-icon.component.html',
  styleUrls: ['./task-status-icon.component.scss'],
})
export class TaskStatusIconComponent implements OnInit, OnChanges {

  @Input()
  task: Task;

  color1: string;
  color2: string;
  statusLabel: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let statusChange = changes['task'];
    if (statusChange != null) {
      this.onTaskChanged(statusChange.currentValue);
    }
  }

  private onTaskChanged(currentValue: Task) {
    this.color1 = this.getColor(currentValue.desiredState);
    this.color2 = this.getColor(currentValue.status.State);
    this.statusLabel = currentValue.desiredState + ' (' + currentValue.status.State + ')';
  }

  private getColor(state: string) {
    switch (state) {
      case 'running':
        return '#156E05';
      case 'ready':
        return '#85D63A';
      case 'shutdown':
        return 'lightgray';
      case 'starting':
        return 'yellow';
      case 'preparing':
        return 'yellow';
      case 'assigned':
        return 'white';
      case 'pending':
        return 'orange';
      case 'rejected':
        return 'red';
      case 'failed':
        return 'red';
      default:
        return 'black';
    }
  }
}
