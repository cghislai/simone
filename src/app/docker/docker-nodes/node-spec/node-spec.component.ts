import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NodeSpec} from '../../client/domain/node-spec';
import {SelectItem} from 'primeng/primeng';
import {ArrayUtils} from '../../../utils/array-utils';

@Component({
  selector: 'app-node-spec',
  templateUrl: './node-spec.component.html',
  styleUrls: ['./node-spec.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NodeSpecComponent,
    multi: true,
  }],
})
export class NodeSpecComponent implements OnInit, ControlValueAccessor {

  spec: NodeSpec;

  specLabels: string[];

  rolesOptions: SelectItem[];
  availabilityOptions: SelectItem[];

  private specTouched: boolean;
  private originalSpec: NodeSpec;

  @Output()
  private touched = new EventEmitter<any>();

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor() {
  }

  ngOnInit() {
    this.initOptions();
  }

  writeValue(obj: any): void {
    this.originalSpec = obj;
    if (!this.specTouched) {
      this.spec = Object.assign({}, obj);
      this.specLabels = this.getLabels(this.spec.Labels);
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
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
    let newSpec = Object.assign({}, this.spec);
    newSpec.Labels = specLabels;
    this.spec = newSpec;
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

  onRoleChange(role: string) {
    let newSpec = Object.assign({}, this.spec);
    newSpec.Role = <('worker' | 'manager')>role;
    this.spec = newSpec;
  }

  onRoleRollback() {
    this.spec.Role = this.originalSpec.Role;
  }

  rolesDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.Role !== this.originalSpec.Role;
  }


  onAvailabilityChange(availability: string) {
    let newSpec = Object.assign({}, this.spec);
    newSpec.Availability = <('active' | 'pause' | 'drain')>availability;
    this.spec = newSpec;
  }

  onAvailabilityRollback() {
    this.spec.Availability = this.originalSpec.Availability;
  }

  availabilitiesDiffer() {
    if (this.spec == null || this.originalSpec == null) {
      return true;
    }
    return this.spec.Availability !== this.originalSpec.Availability;
  }

  onTouched() {
    this.firetouched();
  }

  onApplyChangesClicked() {
    this.fireChange(this.spec);
    this.specTouched = false;
  }

  onCancelChangesClicked() {
    this.spec = Object.assign({}, this.originalSpec);
    this.specLabels = this.getLabels(this.spec.Labels);
    this.specTouched = false;
  }

  private firetouched() {
    this.onTouchedFunction();
    this.touched.next(true);
    this.specTouched = true;
  }

  private fireChange(spec: NodeSpec) {
    this.onChangeFunction(spec);
  }

  private initOptions() {
    this.availabilityOptions = [
      {
        label: 'Active',
        value: 'active',
      }, {
        label: 'Pause',
        value: 'pause',
      },
      {
        label: 'Drain',
        value: 'drain',
      },
    ];
    this.rolesOptions = [
      {
        label: 'Manager',
        value: 'manager',
      }, {
        label: 'Worker',
        value: 'worker',
      },
    ];
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
}
