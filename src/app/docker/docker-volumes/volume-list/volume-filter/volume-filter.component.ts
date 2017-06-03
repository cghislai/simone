import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {VolumeFilter} from '../../../client/domain/volume-filter';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-volume-filter',
  templateUrl: './volume-filter.component.html',
  styleUrls: ['./volume-filter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: VolumeFilterComponent,
    multi: true,
  }],
})
export class VolumeFilterComponent implements OnInit, ControlValueAccessor {

  names: string[] = [];
  labels: string[] = [];
  drivers: string[] = [];
  dangling: boolean[] = [];
  danglingOptions: SelectItem[];

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor() {
  }

  ngOnInit() {
    this.initDanglingOptions();
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

  onLabelsChange(labels: string[]) {
    this.labels = labels;
    this.onTouchedFunction();
    this.fireFilter();
  }


  onDriversChange(drivers: string[]) {
    this.drivers = drivers;
    this.onTouchedFunction();
    this.fireFilter();
  }

  onDanglingChange(dangling: boolean[]) {
    this.dangling = dangling;
    this.onTouchedFunction();
    this.fireFilter();
  }


  private setFilter(filter: VolumeFilter) {
    if (filter == null) {
      this.names = [];
      this.labels = [];
      this.drivers = [];
      this.dangling = [];
      return;
    }

    this.names = filter.name;
    this.labels = filter.label;
    this.drivers = filter.driver;
    this.dangling = filter.dangling;
  }

  private fireFilter() {
    let filter: VolumeFilter = {
      name: this.names,
      label: this.labels,
      driver: this.drivers,
      dangling: this.dangling,
    };
    this.onChangeFunction(filter);
  }

  private initDanglingOptions() {
    this.danglingOptions = [
      {
        value: true,
        label: 'Yes',
      }, {
        value: false,
        label: 'No',
      },
    ];
  }
}
