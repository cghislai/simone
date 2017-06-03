import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';
import {TASK_STATE_LABELS} from '../../client/domain/task-state-label';

@Component({
  selector: 'app-task-filter-state',
  templateUrl: './task-filter-state.component.html',
  styleUrls: ['./task-filter-state.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TaskFilterDesiredStateComponent,
    multi: true,
  }],
})
export class TaskFilterDesiredStateComponent implements OnInit, ControlValueAccessor {


  @Input()
  desired: boolean;

  states: string[];
  options: (SelectItem & { desirable: boolean })[];

  onChangeFunction: Function;
  onTouchedFunction: Function;

  constructor() {
  }

  ngOnInit() {
    this.initOptions();
  }

  writeValue(obj: any): void {
    this.states = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  onStatesChange(states: string[]) {
    this.onTouchedFunction();
    this.onChangeFunction(states);
  }

  private initOptions() {
    this.options = [{
      value: 'new',
      label: TASK_STATE_LABELS.new['en'],
      desirable: false,
    }, {
      value: 'allocated',
      label: TASK_STATE_LABELS.allocated['en'],
      desirable: false,
    }, {
      value: 'pending',
      label: TASK_STATE_LABELS.pending['en'],
      desirable: false,
    }, {
      value: 'assigned',
      label: TASK_STATE_LABELS.assigned['en'],
      desirable: false,
    }, {
      value: 'accepted',
      label: TASK_STATE_LABELS.accepted['en'],
      desirable: false,
    }, {
      value: 'preparing',
      label: TASK_STATE_LABELS.preparing['en'],
      desirable: false,
    }, {
      value: 'ready',
      label: TASK_STATE_LABELS.ready['en'],
      desirable: true,
    }, {
      value: 'starting',
      label: TASK_STATE_LABELS.starting['en'],
      desirable: false,
    }, {
      value: 'running',
      label: TASK_STATE_LABELS.running['en'],
      desirable: true,
    }, {
      value: 'complete',
      label: TASK_STATE_LABELS.complete['en'],
      desirable: false,
    }, {
      value: 'shutdown',
      label: TASK_STATE_LABELS.shutdown['en'],
      desirable: true,
    }, {
      value: 'failed',
      label: TASK_STATE_LABELS.failed['en'],
      desirable: false,
    }, {
      value: 'rejected',
      label: TASK_STATE_LABELS.rejected['en'],
      desirable: false,
    }];
    if (this.desired) {
      this.options = this.options
        .filter(item => item.desirable);
    }
  }
}
