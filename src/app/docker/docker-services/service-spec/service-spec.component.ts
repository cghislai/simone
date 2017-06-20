import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ServiceSpec} from '../../client/domain/service-spec';
import {ServiceMode} from '../../client/domain/service-mode';
import {ArrayUtils} from '../../../utils/array-utils';
import {PortBinding} from '../../client/domain/port-binding';
import {ObjectUtils} from '../../../utils/ObjectUtils';
import {NetworkSpec} from '../../client/domain/network-spec';
import {SingleActiveEditableFieldProvider} from '../../../utils/editable-field/SingleActiveEditableFieldProvider';

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
      this.setSpec(ObjectUtils.deepClone(this.originalSpec));
      this.specLabels = this.getLabels(this.spec.Labels);
      if (this.spec.EndpointSpec == null) {
        this.spec.EndpointSpec = {
          Ports: [],
          Mode: 'VIP',
        };
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  onNameChange(name: string) {
    let newSpec = ObjectUtils.deepClone(this.spec);
    newSpec.Name = name;
    this.setSpec(newSpec);
  }

  onNameRollback() {
    let newSpec = ObjectUtils.deepClone(this.spec);
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
    let newSpec = ObjectUtils.deepClone(this.spec);
    newSpec.Mode = this.originalSpec.Mode;
    this.setSpec(newSpec);
  }

  modesDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return (this.spec.Mode.Replicated == null) !== (this.originalSpec.Mode.Replicated == null)
      || (this.spec.Mode.Global == null) !== (this.originalSpec.Mode.Global == null)
      || (this.spec.Mode.Replicated.Replicas) !== (this.originalSpec.Mode.Replicated.Replicas)
  }

  onLabelsChange(labels: string[]) {
    this.specLabels = labels;
    let specLabels = {};
    labels.forEach(label => {
      let splitted = label.split('=');
      let key = splitted[0];
      let value = splitted.length > 1 ? splitted[1] : '';
      specLabels[key] = value;
    });
    let newSpec = ObjectUtils.deepClone(this.spec);
    newSpec.Labels = specLabels;
    this.setSpec(newSpec);
  }

  onLabelsRollback() {
    this.specLabels = this.getLabels(this.originalSpec.Labels);
    this.spec.Labels = this.originalSpec.Labels;
  }

  labelsDiffer() {
    if (this.originalSpec == null) {
      return true;
    }
    let originalLabels = this.getLabels(this.originalSpec.Labels);
    return ArrayUtils.arrayContentDiffer(originalLabels, this.specLabels);
  }

  onPortsChange(ports: PortBinding[]) {
    let newSpec = ObjectUtils.deepClone(this.spec);
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
    let newSpec = ObjectUtils.deepClone(this.spec);
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
    let newSpec = ObjectUtils.deepClone(this.spec);
    newSpec.Networks = networks;
    this.setSpec(newSpec);
  }


  onNetworksRollback() {
    let newSpec = ObjectUtils.deepClone(this.spec);
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

  private setSpec(spec: ServiceSpec) {
    this.spec = spec;
    if (spec == null) {
      return;
    }
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
