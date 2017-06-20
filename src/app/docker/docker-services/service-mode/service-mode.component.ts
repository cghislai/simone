import {Component, Input, OnInit} from '@angular/core';
import {ServiceMode} from '../../client/domain/service-mode';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-service-mode',
  templateUrl: './service-mode.component.html',
  styleUrls: ['./service-mode.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ServiceModeComponent,
    multi: true,
  }],
})
export class ServiceModeComponent implements OnInit, ControlValueAccessor {


  @Input()
  showReplicas: boolean;
  @Input()
  editable: boolean;

  mode: ServiceMode;
  modeOptions: SelectItem[];

  private onTouchedFunction: Function;
  private onChangeFunction: Function;

  constructor() {
  }

  ngOnInit() {
    this.modeOptions = [{
      label: 'Global',
      value: 'global',
    }, {
      label: 'Replicated',
      value: 'replicated',
    }];
  }

  writeValue(obj: any): void {
    this.mode = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  onModeChange(mode: string) {
    let newMode: ServiceMode = {};
    if (mode == 'replicated') {
      newMode.Replicated = {
        Replicas: this.mode.Replicated != null ? this.mode.Replicated.Replicas : 1,
      };
    } else {
      newMode.Global = {};
    }
    this.mode = newMode;
    this.onTouchedFunction();
    this.onChangeFunction(newMode);
  }

  onReplicasChange(replicas: number) {
    let newMode: ServiceMode = Object.assign({}, this.mode);
    newMode.Replicated.Replicas = replicas;
    this.mode = newMode;
    this.onTouchedFunction();
    this.onChangeFunction(newMode);
  }

}
