import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ServiceSpec} from '../../client/domain/service-spec';
import {ServiceMode} from '../../client/domain/service-mode';
import {ArrayUtils} from '../../../utils/array-utils';
import {PortBinding} from '../../client/domain/port-binding';
import {ObjectUtils} from '../../../utils/ObjectUtils';
import {NetworkSpec} from '../../client/domain/network-spec';
import {SingleActiveEditableFieldProvider} from '../../../utils/editable-field/SingleActiveEditableFieldProvider';
import {ServiceUpdateConfig} from '../../client/domain/service-update-config';
import {TaskTemplateJson} from '../../client/domain/task-template';
import {ContainerSpecJson} from '../../client/domain/container-spec';

@Component({
  selector: 'app-service-spec',
  templateUrl: './service-spec.component.html',
  styleUrls: ['./service-spec.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ServiceSpecComponent,
      multi: true,
    },
    SingleActiveEditableFieldProvider,
  ],
})
export class ServiceSpecComponent implements OnInit, ControlValueAccessor {

  @Input()
  editable: boolean;
  @Input()
  highlightDiffTo: ServiceSpec;

  spec: ServiceSpec;
  specLabels: string[];

  private specTouched: boolean;
  private originalSpec: ServiceSpec;

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

  onNameChange(name: string) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Name = name;
    this.setSpec(newSpec);
  }

  onNameRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Name = this.getComparisonSpec().Name;
    this.setSpec(newSpec);
  }

  namesDiffer() {
    if (this.spec == null || this.getComparisonSpec() == null) {
      return true;
    }
    return this.spec.Name !== this.getComparisonSpec().Name;
  }

  onModeChange(mode: ServiceMode) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Mode = mode;
    this.setSpec(newSpec);
  }

  onModeRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Mode = this.getComparisonSpec().Mode;
    this.setSpec(newSpec);
  }

  modesDiffer() {
    if (this.spec == null || this.getComparisonSpec() == null) {
      return true;
    }
    return this.spec.Mode.Replicated != null && this.getComparisonSpec().Mode.Replicated != null
      && (
        (this.spec.Mode.Global == null) !== (this.getComparisonSpec().Mode.Global == null)
        || (this.spec.Mode.Replicated.Replicas) !== (this.getComparisonSpec().Mode.Replicated.Replicas));
  }

  onLabelsChange(labels: string[]) {
    let labelsDict = ObjectUtils.arrayToDict(labels);
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Labels = labelsDict;
    this.setSpec(newSpec);
  }

  onLabelsRollback() {
    this.specLabels = ObjectUtils.dictToArray(this.getComparisonSpec().Labels);
    this.spec.Labels = this.getComparisonSpec().Labels;
  }

  labelsDiffer() {
    if (this.getComparisonSpec() == null) {
      return true;
    }
    return ArrayUtils.arrayContentDiffer(
      this.specLabels, ObjectUtils.dictToArray(this.getComparisonSpec().Labels),
    );
  }

  onPortsChange(ports: PortBinding[]) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    if (newSpec.EndpointSpec == null) {
      newSpec.EndpointSpec = {
        Ports: ports,
        Mode: 'VIP',
      };
    } else {
      newSpec.EndpointSpec.Ports = ports;
    }
    this.setSpec(newSpec);
  }

  onPortsRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.EndpointSpec = this.getComparisonSpec().EndpointSpec;
    this.setSpec(newSpec);
  }

  portsDiffer() {
    if (this.spec == null || this.getComparisonSpec() == null) {
      return true;
    }
    if ((this.spec.EndpointSpec == null) != (this.getComparisonSpec().EndpointSpec == null)) {
      return true;
    }
    if (this.spec.EndpointSpec != null) {
      return ArrayUtils.arrayContentDiffer(this.spec.EndpointSpec.Ports,
        this.getComparisonSpec().EndpointSpec.Ports,
        (port1: PortBinding, port2: PortBinding) => {
          return port1.TargetPort == port2.TargetPort
            && port1.PublishedPort == port2.PublishedPort
            && port1.Protocol == port2.Protocol
        });
    }
  }


  onRollbackConfigChange(rollbackConfig: ServiceUpdateConfig) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.RollbackConfig = rollbackConfig;
    this.setSpec(newSpec);
  }

  onRollbackConfigRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.RollbackConfig = this.getComparisonSpec().RollbackConfig;
    this.setSpec(newSpec);
  }

  rollbackConfigDiffer() {
    if (this.spec == null || this.getComparisonSpec() == null) {
      return true;
    }
    return this.spec.RollbackConfig !== this.getComparisonSpec().RollbackConfig;
  }


  onUpdateConfigChange(updateConfig: ServiceUpdateConfig) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.UpdateConfig = updateConfig;
    this.setSpec(newSpec);
  }

  onUpdateConfigUpdate() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.UpdateConfig = this.getComparisonSpec().UpdateConfig;
    this.setSpec(newSpec);
  }

  updateConfigDiffer() {
    if (this.spec == null || this.getComparisonSpec() == null) {
      return true;
    }
    return this.spec.UpdateConfig !== this.getComparisonSpec().UpdateConfig;
  }

  onTaskTemplateChange(taskTemplate: TaskTemplateJson) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.TaskTemplate = taskTemplate;
    this.setSpec(newSpec);
  }

  onContainerSpecChange(spec: ContainerSpecJson) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.TaskTemplate.ContainerSpec = spec;
    this.setSpec(newSpec);
  }

  onTouched() {
    this.firetouched();
  }

  private firetouched() {
    this.specTouched = true;
    this.onTouchedFunction();
    this.touched.next(true);
  }

  private fireChange(spec: ServiceSpec) {
    this.onChangeFunction(spec);
  }

  private initOptions() {

  }

  private setSpec(spec: ServiceSpec, fireChange = true) {
    this.spec = spec;
    if (spec == null) {
      return;
    }
    this.specLabels = ObjectUtils.dictToArray(spec.Labels);
    // TODO: move this in service
    if (this.spec.EndpointSpec == null) {
      this.spec.EndpointSpec = {
        Ports: [],
        Mode: 'VIP',
      }
    } else if (this.spec.EndpointSpec.Ports == null) {
      this.spec.EndpointSpec.Ports = [];
    }

    if (fireChange) {
      this.fireChange(this.spec);
    }
  }

  getComparisonSpec() {
    if (this.highlightDiffTo != null) {
      return this.highlightDiffTo;
    }
    return this.originalSpec;
  }
}
