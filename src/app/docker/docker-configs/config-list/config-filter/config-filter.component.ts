import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ConfigFilter} from '../../../client/domain/config-filter';

@Component({
  selector: 'app-config-filter',
  templateUrl: './config-filter.component.html',
  styleUrls: ['./config-filter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ConfigFilterComponent,
    multi: true,
  }],
})
export class ConfigFilterComponent implements OnInit, ControlValueAccessor {

  names: string[] = [];


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


  onNamesChange(names: string[]) {
    this.names = names;
    this.onTouchedFunction();
    this.fireFilter();
  }


  private setFilter(filter: ConfigFilter) {
    if (filter == null) {
      this.names = [];
      return;
    }

    this.names = filter.names;
  }

  private fireFilter() {
    let filter: ConfigFilter = {
      names: this.names,
    };
    this.onChangeFunction(filter);
  }

}
