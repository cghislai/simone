import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ServiceUpdateConfig} from '../../client/domain/service-update-config';
import {ObjectUtils} from '../../../utils/ObjectUtils';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-update-config',
  templateUrl: './update-config.component.html',
  styleUrls: ['./update-config.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UpdateConfigComponent,
      multi: true,
    }],
})
export class UpdateConfigComponent implements OnInit, ControlValueAccessor {

  @Input()
  editable: boolean;

  spec: ServiceUpdateConfig;
  specLabels: string[];

  failureActionOptions: SelectItem[];
  orderOptions: SelectItem[];

  private specTouched: boolean;
  private originalSpec: ServiceUpdateConfig;

  private onTouchedFunction: Function;
  private onChangeFunction: Function;

  @Output()
  private touched = new EventEmitter<any>();


  constructor() {
  }

  ngOnInit() {
    this.initOptions();
  }

  writeValue(obj: any): void {
    this.originalSpec = obj;
    if (!this.specTouched && obj != null) {
      this.setSpec(ObjectUtils.jsonClone(this.originalSpec));
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }


  onParallelismChange(parallelism: number) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Parallelism = parallelism;
    this.setSpec(newSpec);
  }

  onParallelismRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Parallelism = this.originalSpec.Parallelism;
    this.setSpec(newSpec);
  }

  parallelismDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.Parallelism !== this.originalSpec.Parallelism;
  }


  onDelaySecondChange(delay: number) {
    let nanoSeconds = delay * 1000000000;
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Delay = nanoSeconds;
    this.setSpec(newSpec);
  }

  onDelayRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Delay = this.originalSpec.Delay;
    this.setSpec(newSpec);
  }

  delayDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.Delay !== this.originalSpec.Delay;
  }


  onFailureActionChange(failureAction: number) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.FailureAction = failureAction;
    this.setSpec(newSpec);
  }

  onFailureActionRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.FailureAction = this.originalSpec.FailureAction;
    this.setSpec(newSpec);
  }

  failureActionDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.FailureAction !== this.originalSpec.FailureAction;
  }


  onMonitorSecondsChange(monitor: number) {
    let nanoSec = monitor * 1000000000;
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Monitor = nanoSec;
    this.setSpec(newSpec);
  }

  onMonitorRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Monitor = this.originalSpec.Monitor;
    this.setSpec(newSpec);
  }

  monitorDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.Monitor !== this.originalSpec.Monitor;
  }


  onMaxFailureRatioChange(maxFailureRatio: number) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.MaxFailureRatio = maxFailureRatio;
    this.setSpec(newSpec);
  }

  onMaxFailureRatioRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.MaxFailureRatio = this.originalSpec.MaxFailureRatio;
    this.setSpec(newSpec);
  }

  maxFailureRatioDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.MaxFailureRatio !== this.originalSpec.MaxFailureRatio;
  }


  onOrderChange(order: number) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Order = order;
    this.setSpec(newSpec);
  }

  onOrderRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Order = this.originalSpec.Order;
    this.setSpec(newSpec);
  }

  orderDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.Order !== this.originalSpec.Order;
  }


  onTouched() {
    this.firetouched();
  }

  private firetouched() {
    this.specTouched = true;
    this.onTouchedFunction();
    this.touched.next(true);
  }

  private fireChange(spec: ServiceUpdateConfig) {
    this.onChangeFunction(spec);
  }

  private initOptions() {
    this.orderOptions = [{
      label: 'Start first', value: 'start-first',
    }, {
      label: 'Stop first', value: 'stop-first',
    }];
    this.failureActionOptions = [{
      label: 'Continue', value: 'continue',
    }, {
      label: 'Pause', value: 'pause',
    }, {
      label: 'Rollback', value: 'rollback',
    }];
  }

  private setSpec(spec: ServiceUpdateConfig) {
    this.spec = spec;
    if (spec == null) {
      return;
    }
    this.fireChange(spec);
  }

}
