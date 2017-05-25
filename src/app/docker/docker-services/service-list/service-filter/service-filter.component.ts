import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ServiceFilter} from '../../../domain/services/service-filter';

@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrls: ['./service-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ServiceFilterComponent,
    multi: true,
  }],
})
export class ServiceFilterComponent implements OnInit, ControlValueAccessor {

  ids: string[] = [];
  names: string[] = [];
  labels: string[] = [];

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor() {
  }

  ngOnInit() {
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

  private setFilter(filter: ServiceFilter) {
    if (filter == null) {
      this.ids = [];
      this.names = [];
      this.labels = [];
      return;
    }

    this.ids = filter.id;
    this.names = filter.name;
    this.labels = filter.label == null ? [] : filter.label;
  }

  private fireFilter() {
    let filter: ServiceFilter = {
      id: this.ids,
      name: this.names,
      label: this.labels,
    };
    this.onChangeFunction(filter);
  }
}
