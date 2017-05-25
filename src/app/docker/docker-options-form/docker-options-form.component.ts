import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DockerOptionsService} from '../services/docker-options.service';
import {OptionMode} from './option-mode.';
import {SelectItem} from 'primeng/primeng';
import {SimoneDockerOptions} from '../domain/docker-options';

@Component({
  selector: 'app-docker-options-form',
  templateUrl: 'docker-options-form.component.html',
  styleUrls: ['docker-options-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DockerOptionsFormComponent,
      multi: true,
    },
  ],
})
export class DockerOptionsFormComponent implements OnInit, ControlValueAccessor {

  options: SimoneDockerOptions;
  isModeSocket: boolean;
  isModeHttp: boolean;
  tlsEnabled: boolean;
  optionsMode: OptionMode;
  optionsModes: SelectItem[];
  protocols: SelectItem[];

  @Output()
  private cancel = new EventEmitter<boolean>();

  private onChangeFn: Function;
  private onTouchedFn: Function;

  constructor(private optionsService: DockerOptionsService) {
  }

  ngOnInit() {
    this.createDefaultOptions();
    this.initSelectOptions();
  }


  writeValue(obj: any): void {
    this.options = obj;
    if (this.options == null) {
      this.createDefaultOptions();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  onOptionsModeChange(mode) {
    this.optionsMode = mode;
    this.isModeHttp = this.optionsMode == OptionMode.REMOTE_HTTP;
    this.isModeSocket = this.optionsMode == OptionMode.LOCAL_SOCKET_FILE;
  }


  onCaChange(event) {
    let files: FileList = event.srcElement.files;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.options.ca = e.target.result;
    };
    reader.readAsText(files.item(0));
  }


  onCertChange(event) {
    let files: FileList = event.srcElement.files;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.options.cert = e.target.result;
    };
    reader.readAsText(files.item(0));
  }

  onKeyChange(event) {
    let files: FileList = event.srcElement.files;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.options.key = e.target.result;
    };
    reader.readAsText(files.item(0));
  }


  onSubmit() {
    this.onTouchedFn();
    this.onChangeFn(this.options);
  }

  onCancel() {
    this.cancel.emit(true);
  }

  private createDefaultOptions() {
    let options = this.optionsService.getLastOptions();
    this.options = Object.assign({}, options);
    this.optionsMode = OptionMode.REMOTE_HTTP;
    this.tlsEnabled = false;
  }


  private initSelectOptions() {
    this.optionsModes = [OptionMode.REMOTE_HTTP, OptionMode.LOCAL_SOCKET_FILE]
      .map(option => <SelectItem>{
        value: option,
        label: this.getOptionLabel(option),
      });
    this.protocols = [{
      value: 'http', label: 'HTTP',
    }, {value: 'https', label: 'HTTPS'}];
  }

  private getOptionLabel(option: OptionMode) {
    switch (option) {
      case OptionMode.REMOTE_HTTP:
        return 'HTTP';
      case OptionMode.LOCAL_SOCKET_FILE:
        return 'Unix socket'
    }
    return '';
  }


}
