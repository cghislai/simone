import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-placement-constraint',
  templateUrl: './placement-constraint.component.html',
  styleUrls: ['./placement-constraint.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: PlacementConstraintComponent,
    multi: true,
  }],
})
export class PlacementConstraintComponent implements OnInit, ControlValueAccessor {

  @Input()
  editable: boolean;

  constraints: string[] = [];

  private onTouchedFunction: Function;
  private onChangeFunction: Function;

  constructor() {
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.constraints = obj == null ? [] : obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  onConstraintsChange(constraints: string[]) {
    this.constraints = constraints;
    this.onTouchedFunction();
    this.onChangeFunction([...this.constraints]);
  }
}
