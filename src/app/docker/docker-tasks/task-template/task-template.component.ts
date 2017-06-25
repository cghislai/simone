import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskTemplateJson} from '../../client/domain/task-template';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SingleActiveEditableFieldProvider} from '../../../utils/editable-field/SingleActiveEditableFieldProvider';
import {ObjectUtils} from '../../../utils/ObjectUtils';
import {ArrayUtils} from '../../../utils/array-utils';
import {NetworkSpec} from '../../client/domain/network-spec';

@Component({
  selector: 'app-task-template',
  templateUrl: './task-template.component.html',
  styleUrls: ['./task-template.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TaskTemplateComponent,
    multi: true,
  }],
})
export class TaskTemplateComponent implements OnInit, ControlValueAccessor {


  @Input()
  editable: boolean;

  template: TaskTemplateJson;

  private specTouched: boolean;
  private originalSpec: TaskTemplateJson;

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


  onTouched() {
    this.firetouched();
  }

  onForceUpdateChange(force: boolean) {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.ForceUpdate = force ? 1 : 0; // TODO move in service
    this.setSpec(newSpec);
  }

  onForceUpdateRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.ForceUpdate = this.originalSpec.ForceUpdate;
    this.setSpec(newSpec);
  }

  forceUpdateDiffer() {
    return this.originalSpec.ForceUpdate !== this.template.ForceUpdate;
  }

  onNetworksChange(networks: NetworkSpec[]) {
    let newSpec = ObjectUtils.jsonClone(this.template);
    newSpec.Networks = networks;
    this.setSpec(newSpec);
  }


  onNetworksRollback() {
    let newSpec = ObjectUtils.jsonClone(this.template);
    newSpec.Networks = this.originalSpec.Networks;
    this.setSpec(newSpec);
  }

  networksDiffer() {
    if (this.template == null || this.originalSpec == null) {
      return true;
    }
    return ArrayUtils.arrayContentDiffer(this.template.Networks, this.originalSpec.Networks,
      (net1: NetworkSpec, net2: NetworkSpec) => {
        return net1.Target === net2.Target
          && !ArrayUtils.arrayContentDiffer(net1.Aliases, net2.Aliases);
      });
  }

  onConstraintsChange(constraints: string[]) {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.Placement.Constraints = constraints;
    this.setSpec(newSpec);
  }


  onConstraintsRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.Placement.Constraints = [...this.originalSpec.Placement.Constraints];
    this.setSpec(newSpec);
  }

  constraintsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.originalSpec.Placement.Constraints,
      this.template.Placement.Constraints);
  }

  onMemoryMegaBytesLimitChange(megaBytes: number) {
    let bytes = megaBytes * 1024 * 1024;
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.Resources.Limits.MemoryBytes = bytes < 0.0000000001 ? 0 : bytes;
    this.setSpec(newSpec);
  }

  onMemoryBytesLimitRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.Resources.Limits.MemoryBytes = this.originalSpec.Resources.Limits.MemoryBytes;
    this.setSpec(newSpec);
  }

  memoryBytesLimitDiffer() {
    return this.template.Resources.Limits.MemoryBytes !== this.originalSpec.Resources.Limits.MemoryBytes;
  }

  onCPULimitChange(cpu: number) {
    let nanoCpus = cpu * 1000000000;
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.Resources.Limits.NanoCPUs = nanoCpus;
    this.setSpec(newSpec);
  }

  onNanoCPUsLimitRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.Resources.Limits.NanoCPUs = this.originalSpec.Resources.Limits.NanoCPUs;
    this.setSpec(newSpec);
  }

  cpuLimitDiffer() {
    return this.template.Resources.Limits.NanoCPUs !== this.originalSpec.Resources.Limits.NanoCPUs;
  }


  onRestartConditionChange(condition: string) {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Condition = <'none' | 'on-failure' | 'any'>condition;
    this.setSpec(newSpec);
  }

  onRestartConditionRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Condition = this.originalSpec.RestartPolicy.Condition;
    this.setSpec(newSpec);
  }

  restartConditionDiffer() {
    return this.template.RestartPolicy.Condition !== this.originalSpec.RestartPolicy.Condition;
  }


  onRestartMaxAttemptsChange(maxAttempts: number) {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.MaxAttempts = maxAttempts;
    this.setSpec(newSpec);
  }

  onRestartMaxAttemptsRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.MaxAttempts = this.originalSpec.RestartPolicy.MaxAttempts;
    this.setSpec(newSpec);
  }

  restartMaxAttemptsDiffer() {
    return this.template.RestartPolicy.MaxAttempts !== this.originalSpec.RestartPolicy.MaxAttempts;
  }


  onRestartDelaySecondChange(delay: number) {
    let nanos = delay * 1000000000;
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Delay = nanos;
    this.setSpec(newSpec);
  }

  onRestartDelayRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Delay = this.originalSpec.RestartPolicy.Delay;
    this.setSpec(newSpec);
  }

  restartDelayDiffer() {
    return this.template.RestartPolicy.Delay !== this.originalSpec.RestartPolicy.Delay;
  }


  onRestartWindowChange(window: number) {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Window = window;
    this.setSpec(newSpec);
  }

  onRestartWindowRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Window = this.originalSpec.RestartPolicy.Window;
    this.setSpec(newSpec);
  }

  restartWindowDiffer() {
    return this.template.RestartPolicy.Window !== this.originalSpec.RestartPolicy.Window;
  }


  private firetouched() {
    this.specTouched = true;
    this.onTouchedFunction();
    this.touched.next(true);
  }

  private fireChange(spec: TaskTemplateJson) {
    this.onChangeFunction(spec);
  }

  private getLabels(labels: any): string[] {
    if (labels == null) {
      return [];
    }
    let keys = Reflect.ownKeys(labels);
    return keys.map(key => {
      let value = labels[key];
      if (value == null || value.length === 0) {
        return `${key}`;
      } else {
        return `${key}=${value}`
      }
    });
  }

  private initOptions() {

  }

  private setSpec(spec: TaskTemplateJson) {
    this.template = spec;
    if (spec == null) {
      return;
    }
    this.fireChange(spec);
  }
}
