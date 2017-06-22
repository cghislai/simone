import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HealthConfig} from '../../client/domain/health-config';
import {ObjectUtils} from '../../../utils/ObjectUtils';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-healthcheck-config',
  templateUrl: './healthcheck-config.component.html',
  styleUrls: ['./healthcheck-config.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: HealthcheckConfigComponent,
    multi: true,
  }],
})
export class HealthcheckConfigComponent implements OnInit, ControlValueAccessor {

  @Input()
  editable: boolean;
  @Input()
  rollbackConfig: HealthConfig;
  @Output()
  private touched = new EventEmitter();

  config: HealthConfig;
  testOptions: SelectItem[];
  testType: string;
  testValue: string;

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor() {
  }

  ngOnInit() {
    this.testOptions = [{
      label: 'Inherit', value: null,
    }, {
      label: 'None', value: 'NONE',
    }, {
      label: 'Command', value: 'CMD',
    }, {
      label: 'Shell command', value: 'CMD-SHELL',
    }];
  }

  writeValue(obj: any): void {
    this.setConfig(obj);
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  onChange(field: string, value: any) {
    var newValue = value;
    switch (field) {
      case 'Test':
        newValue = this.getTestType();
        break;
    }
    this.setConfig(ObjectUtils.applyValue(this.config, field, newValue));
    this.fireChange(this.config);
  }

  getTestType(): string[] {
    if (this.testType == null) {
      return [];
    }
    if (this.testType == 'NONE') {
      return [this.testType];
    }
    return [this.testType, this.testValue];
  }

  onRollback(field: string) {
    if (this.rollbackConfig == null) {
      return;
    }
    this.setConfig(ObjectUtils.applyValue(this.config, field, this.rollbackConfig[field]));
    this.fireChange(this.config);
  }

  differs(field: string) {
    if (this.config == null) {
      return false;
    }
    if (this.rollbackConfig == null) {
      return true;
    }
    let thisValue = this.config[field];
    let otherValue = this.rollbackConfig[field];
    return ObjectUtils.valuesDiffer(thisValue, otherValue);
  }

  onTouched() {
    this.onTouchedFunction();
    this.touched.next(true);
  }

  private fireChange(config: HealthConfig) {
    this.onTouched();
    this.onChangeFunction(config);
  }

  private setConfig(config: HealthConfig) {
    this.config = config;
    if (this.config == null) {
      if (this.editable) {
        this.config = this.newConfig();
        this.testType = this.testOptions[0].value;
        this.testValue = '';
      }
      return;
    }

    let test = config.Test;
    if (test == null || test.length === 0) {
      this.testType = this.testOptions[0].value;
      this.testValue = '';
    } else {
      let copy = [...test];
      this.testType = copy[0] == null ? this.testOptions[0].value : this.testType;
      copy.splice(0, 1);
      this.testValue = copy.reduce((c, n) => c + n, '');
    }
  }

  private newConfig(): HealthConfig {
    return {
      Interval: 0,
      Retries: 0,
      StartPeriod: 0,
      Test: [],
      Timeout: 0,
    };
  }
}
