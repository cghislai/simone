import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SecretFilter} from '../../../client/domain/secret-filter';

@Component({
  selector: 'app-secret-filter',
  templateUrl: './secret-filter.component.html',
  styleUrls: ['./secret-filter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SecretFilterComponent,
    multi: true,
  }],
})
export class SecretFilterComponent implements OnInit, ControlValueAccessor {

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


  private setFilter(filter: SecretFilter) {
    if (filter == null) {
      this.names = [];
      return;
    }

    this.names = filter.names;
  }

  private fireFilter() {
    let filter: SecretFilter = {
      names: this.names,
    };
    this.onChangeFunction(filter);
  }

}
