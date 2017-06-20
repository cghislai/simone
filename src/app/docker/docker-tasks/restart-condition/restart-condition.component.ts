import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-restart-condition',
  templateUrl: './restart-condition.component.html',
  styleUrls: ['./restart-condition.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RestartConditionComponent,
    multi: true,
  }],
})
export class RestartConditionComponent implements OnInit, ControlValueAccessor {

  @Input()
  editable: boolean;

  condition: string;
  conditionOptions: SelectItem[];

  private onTouchedFunction: Function;
  private onChangeFunction: Function;

  constructor() {
  }

  ngOnInit() {
    this.conditionOptions = [{
      label: 'Any', value: 'any',
    }, {
      label: 'On failure', value: 'on-failure',
    }, {
      label: 'None', value: 'none',
    }];
  }

  writeValue(obj: any): void {
    this.condition = obj == null ? 'any' : obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  onConditionChange(condition: string) {
    this.condition = condition;
    this.onTouchedFunction();
    this.onChangeFunction(this.condition);
  }
}
