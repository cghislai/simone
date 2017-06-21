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

  onNameChange(name: string) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Name = name;
    this.setSpec(newSpec);
  }

  onNameRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Name = this.originalSpec.Name;
    this.setSpec(newSpec);
  }

  namesDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.Name !== this.originalSpec.Name;
  }

  onModeChange(mode: ServiceMode) {
    this.spec.Mode = mode;
  }

  onModeRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Mode = this.originalSpec.Mode;
    this.setSpec(newSpec);
  }

  modesDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.Mode.Replicated != null && this.originalSpec.Mode.Replicated != null
      && (
        (this.spec.Mode.Global == null) !== (this.originalSpec.Mode.Global == null)
        || (this.spec.Mode.Replicated.Replicas) !== (this.originalSpec.Mode.Replicated.Replicas));
  }

  onLabelsChange(labels: string[]) {
    let labelsDict = ObjectUtils.arrayToDict(labels);
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Labels = labelsDict;
    this.setSpec(newSpec);
  }

  onLabelsRollback() {
    this.specLabels = ObjectUtils.dictToArray(this.originalSpec.Labels);
    this.spec.Labels = this.originalSpec.Labels;
  }

  labelsDiffer() {
    if (this.originalSpec == null) {
      return true;
    }
    return ArrayUtils.arrayContentDiffer(
      this.specLabels, ObjectUtils.dictToArray(this.originalSpec.Labels),
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
    newSpec.EndpointSpec = this.originalSpec.EndpointSpec;
    this.setSpec(newSpec);
  }

  portsDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    if ((this.spec.EndpointSpec == null) != (this.originalSpec.EndpointSpec == null)) {
      return true;
    }
    if (this.spec.EndpointSpec != null) {
      return ArrayUtils.arrayContentDiffer(this.spec.EndpointSpec.Ports,
        this.originalSpec.EndpointSpec.Ports,
        (port1: PortBinding, port2: PortBinding) => {
          return port1.TargetPort == port2.TargetPort
            && port1.PublishedPort == port2.PublishedPort
            && port1.Protocol == port2.Protocol
        });
    }
  }

  onNetworksChange(networks: NetworkSpec[]) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Networks = networks;
    this.setSpec(newSpec);
  }


  onNetworksRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Networks = this.originalSpec.Networks;
    this.setSpec(newSpec);
  }

  networksDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return ArrayUtils.arrayContentDiffer(this.spec.Networks, this.originalSpec.Networks,
      (net1: NetworkSpec, net2: NetworkSpec) => {
        return net1.Target === net2.Target
          && !ArrayUtils.arrayContentDiffer(net1.Aliases, net2.Aliases);
      });
  }


  onRollbackConfigChange(rollbackConfig: ServiceUpdateConfig) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.RollbackConfig = rollbackConfig;
    this.setSpec(newSpec);
  }

  onRollbackConfigRollback() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.RollbackConfig = this.originalSpec.RollbackConfig;
    this.setSpec(newSpec);
  }

  rollbackConfigDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.RollbackConfig !== this.originalSpec.RollbackConfig;
  }


  onUpdateConfigChange(updateConfig: ServiceUpdateConfig) {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.UpdateConfig = updateConfig;
    this.setSpec(newSpec);
  }

  onUpdateConfigUpdate() {
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.UpdateConfig = this.originalSpec.UpdateConfig;
    this.setSpec(newSpec);
  }

  updateConfigDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.UpdateConfig !== this.originalSpec.UpdateConfig;
  }


  onTouched() {
    this.firetouched();
  }

  onApplyChangesClicked() {
    this.fireChange(this.spec);
    this.specTouched = false;
  }

  onCancelChangesClicked() {
    let newSpec = Object.assign({}, this.originalSpec);
    this.setSpec(newSpec);
    this.specTouched = false;
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

  private setSpec(spec: ServiceSpec) {
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
  }
}
