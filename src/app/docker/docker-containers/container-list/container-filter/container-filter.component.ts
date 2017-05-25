import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ContainerFilter} from '../../../domain/containers/container-filter';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-container-filter',
  templateUrl: './container-filter.component.html',
  styleUrls: ['./container-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ContainerFilterComponent,
    multi: true,
  }],
})
export class ContainerFilterComponent implements OnInit, ControlValueAccessor {

  includeStopped: boolean;
  isTask: boolean;
  ids: string[] = [];
  names: string[] = [];
  labels: string[] = [];
  isTaskOptions: SelectItem[];

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor() {
  }

  ngOnInit() {
    this.isTaskOptions = [{
      value: null,
      label: 'All',
    }, {
      value: true,
      label: 'Tasks only',
    }, {
      value: false,
      label: 'No task',
    }];
  }


  writeValue(obj: any): void {
    this.setFilter(obj);
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  onIdChange(ids: string[]) {
    this.ids = ids;
    this.onTouchedFunction();
    this.fireFilter();
  }

  onNamesChange(names: string[]) {
    this.names = names;
    this.onTouchedFunction();
    this.fireFilter();
  }

  onLabelsChange(labels: string[]) {
    this.labels = labels;
    this.onTouchedFunction();
    this.fireFilter();
  }


  onInludeStoppedChange(value: boolean) {
    this.includeStopped = value;
    this.onTouchedFunction();
    this.fireFilter();
  }

  onIsTaskChange(value: boolean) {
    this.isTask = value;
    this.onTouchedFunction();
    this.fireFilter();
  }

  private setFilter(filter: ContainerFilter) {
    if (filter == null) {
      this.ids = [];
      this.names = [];
      this.labels = [];
      this.isTask = null;
      this.includeStopped = false;
      return;
    }

    this.ids = filter.filters.id;
    this.names = filter.filters.name;
    this.labels = filter.filters.label;
    this.includeStopped = filter.includeStopped;
    this.isTask = filter.filters.isTask.length === 0 ? null : filter.filters.isTask.find(t => t === true) != null;
  }

  private fireFilter() {
    let filter: ContainerFilter = {
      includeStopped: this.includeStopped,
      filters: {
        id: this.ids,
        name: this.names,
        label: this.labels,
        isTask: this.isTask == null ? [] : [this.isTask],
      },
    };
    this.onChangeFunction(filter);
  }

}
