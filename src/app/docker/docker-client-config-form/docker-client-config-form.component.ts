import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';
import {DockerClientConfig} from '../domain/docker-client-config';
import {DockerClientConfigService} from '../services/docker-client.service';

@Component({
  selector: 'app-docker-client-config-form',
  templateUrl: 'docker-client-config-form.component.html',
  styleUrls: ['docker-client-config-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DockerOptionsFormComponent,
      multi: true,
    },
  ],
})
export class DockerOptionsFormComponent implements OnInit, ControlValueAccessor {

  config: DockerClientConfig;
  optionsModes: SelectItem[];

  @Output()
  private cancel = new EventEmitter<boolean>();

  private onChangeFn: Function;
  private onTouchedFn: Function;

  constructor(private configService: DockerClientConfigService) {
  }

  ngOnInit() {
    this.createDefaultOptions();
  }


  writeValue(obj: any): void {
    this.config = obj;
    if (this.config == null) {
      this.createDefaultOptions();
    } else {
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  onSubmit() {
    this.onTouchedFn();
    this.onChangeFn(this.config);
  }

  onCancel() {
    this.cancel.emit(true);
  }

  private createDefaultOptions() {
    let config = this.configService.getActiveConfigNow();
    this.config = Object.assign({}, config, {
      api: {},
    });
  }


}
