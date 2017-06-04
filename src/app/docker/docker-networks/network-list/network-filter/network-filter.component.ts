import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NetworkFilter} from '../../../client/domain/network-filter';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-network-filter',
  templateUrl: './network-filter.component.html',
  styleUrls: ['./network-filter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NetworkFilterComponent,
    multi: true,
  }],
})
export class NetworkFilterComponent implements OnInit, ControlValueAccessor {


  names: string[] = [];
  ids: string[] = [];
  types: ('custom' | 'builtin')[] = ['custom', 'builtin'];
  labels: string[] = [];
  drivers: string[] = [];

  typesOptions: SelectItem[];

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor() {
  }

  ngOnInit() {
    this.initTypeOptions();
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


  onNamesChange(names: string[]) {
    this.names = names;
    this.onTouchedFunction();
    this.fireFilter();
  }


  onIdsChange(ids: string[]) {
    this.ids = ids;
    this.onTouchedFunction();
    this.fireFilter();
  }


  onDriversChange(drivers: string[]) {
    this.drivers = drivers;
    this.onTouchedFunction();
    this.fireFilter();
  }


  onLabelsChange(labels: string[]) {
    this.labels = labels;
    this.onTouchedFunction();
    this.fireFilter();
  }

  onTypesChange(types: ('custom' | 'builtin')[]) {
    this.types = types;
    this.onTouchedFunction();
    this.fireFilter();
  }


  private setFilter(filter: NetworkFilter) {
    if (filter == null) {
      this.names = [];
      this.ids = [];
      this.labels = [];
      this.drivers = [];
      this.types = ['custom', 'builtin'];
      return;
    }

    this.names = filter.name;
    this.ids = filter.id;
    this.labels = filter.label;
    this.drivers = filter.driver;
    this.types = filter.type == null ? ['custom', 'builtin'] : filter.type;
  }

  private fireFilter() {
    let filter: NetworkFilter = {
      name: this.names,
      id: this.ids,
      type: this.types,
      label: this.labels,
      driver: this.drivers,
    };
    this.onChangeFunction(filter);
  }

  private initTypeOptions() {
    this.typesOptions = [{
      value: 'custom',
      label: 'Custom',
    }, {
      value: 'builtin',
      label: 'Built-in',
    }];
  }
}
