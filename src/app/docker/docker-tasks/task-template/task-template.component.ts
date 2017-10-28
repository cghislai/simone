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
  @Input()
  highlightDiffTo: TaskTemplateJson;

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
    if (obj != null) {
      this.setSpec(ObjectUtils.jsonClone(this.originalSpec), false);
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
    newSpec.ForceUpdate = this.getComparisonSpec().ForceUpdate;
    this.setSpec(newSpec);
  }

  forceUpdateDiffer() {
    return this.getComparisonSpec().ForceUpdate !== this.template.ForceUpdate;
  }

  onNetworksChange(networks: NetworkSpec[]) {
    let newSpec = ObjectUtils.jsonClone(this.template);
    newSpec.Networks = networks;
    this.setSpec(newSpec);
  }


  onNetworksRollback() {
    let newSpec = ObjectUtils.jsonClone(this.template);
    newSpec.Networks = this.getComparisonSpec().Networks;
    this.setSpec(newSpec);
  }

  networksDiffer() {
    if (this.template == null || this.getComparisonSpec() == null) {
      return true;
    }
    return ArrayUtils.arrayContentDiffer(this.template.Networks, this.getComparisonSpec().Networks,
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
    newSpec.Placement.Constraints = [...this.getComparisonSpec().Placement.Constraints];
    this.setSpec(newSpec);
  }

  constraintsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.getComparisonSpec().Placement.Constraints,
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
    newSpec.Resources.Limits.MemoryBytes = this.getComparisonSpec().Resources.Limits.MemoryBytes;
    this.setSpec(newSpec);
  }

  memoryBytesLimitDiffer() {
    if (this.template == null || this.template.Resources == null || this.template.Resources.Limits == null) {
      return false;
    }
    if (this.getComparisonSpec() == null || this.getComparisonSpec().Resources == null || this.getComparisonSpec().Resources.Limits == null) {
      return false;
    }
    return this.template.Resources.Limits.MemoryBytes !== this.getComparisonSpec().Resources.Limits.MemoryBytes;
  }

  onCPULimitChange(cpu: number) {
    let nanoCpus = cpu * 1000000000;
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.Resources.Limits.NanoCPUs = nanoCpus;
    this.setSpec(newSpec);
  }

  onNanoCPUsLimitRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.Resources.Limits.NanoCPUs = this.getComparisonSpec().Resources.Limits.NanoCPUs;
    this.setSpec(newSpec);
  }

  cpuLimitDiffer() {
    if (this.template == null || this.template.Resources == null || this.template.Resources.Limits == null) {
      return false;
    }
    if (this.getComparisonSpec() == null || this.getComparisonSpec().Resources == null || this.getComparisonSpec().Resources.Limits == null) {
      return false;
    }
    return this.template.Resources.Limits.NanoCPUs !== this.getComparisonSpec().Resources.Limits.NanoCPUs;
  }


  onRestartConditionChange(condition: string) {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Condition = <'none' | 'on-failure' | 'any'>condition;
    this.setSpec(newSpec);
  }

  onRestartConditionRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Condition = this.getComparisonSpec().RestartPolicy.Condition;
    this.setSpec(newSpec);
  }

  restartConditionDiffer() {
    return this.template.RestartPolicy.Condition !== this.getComparisonSpec().RestartPolicy.Condition;
  }


  onRestartMaxAttemptsChange(maxAttempts: number) {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.MaxAttempts = maxAttempts;
    this.setSpec(newSpec);
  }

  onRestartMaxAttemptsRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.MaxAttempts = this.getComparisonSpec().RestartPolicy.MaxAttempts;
    this.setSpec(newSpec);
  }

  restartMaxAttemptsDiffer() {
    return this.template.RestartPolicy.MaxAttempts !== this.getComparisonSpec().RestartPolicy.MaxAttempts;
  }


  onRestartDelaySecondChange(delay: number) {
    let nanos = delay * 1000000000;
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Delay = nanos;
    this.setSpec(newSpec);
  }

  onRestartDelayRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Delay = this.getComparisonSpec().RestartPolicy.Delay;
    this.setSpec(newSpec);
  }

  restartDelayDiffer() {
    return this.template.RestartPolicy.Delay !== this.getComparisonSpec().RestartPolicy.Delay;
  }


  onRestartWindowChange(window: number) {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Window = window;
    this.setSpec(newSpec);
  }

  onRestartWindowRollback() {
    let newSpec: TaskTemplateJson = ObjectUtils.jsonClone(this.template);
    newSpec.RestartPolicy.Window = this.getComparisonSpec().RestartPolicy.Window;
    this.setSpec(newSpec);
  }

  restartWindowDiffer() {
    return this.template.RestartPolicy.Window !== this.getComparisonSpec().RestartPolicy.Window;
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

  private setSpec(spec: TaskTemplateJson, fireChange = true) {
    this.template = spec;
    if (spec == null) {
      return;
    }
    if (fireChange) {
      this.fireChange(spec);
    }
  }

  private getComparisonSpec() {
    if (this.highlightDiffTo != null) {
      return this.highlightDiffTo;
    }
    return this.originalSpec;
  }
}
