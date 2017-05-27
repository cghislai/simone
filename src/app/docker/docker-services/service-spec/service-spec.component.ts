import {Component, Input, OnInit} from '@angular/core';
import {ServiceSpec} from '../../domain/services/service-spec';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-service-spec',
  templateUrl: './service-spec.component.html',
  styleUrls: ['./service-spec.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ServiceSpecComponent,
      multi: true
    }
  ]
})
export class ServiceSpecComponent implements OnInit, ControlValueAccessor {

  @Input()
  spec: ServiceSpec;

  private onTouchedFunction: Function;
  private onChangeFunction: Function;


  constructor() {
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.spec = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

}
