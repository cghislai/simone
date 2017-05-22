import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SimoneDockerOptions} from '../../domain/docker-options';
import {DockerOptionsService} from '../services/docker-options.service';

@Component({
  selector: 'app-docker-options-form',
  templateUrl: 'docker-options-form.component.html',
  styleUrls: ['docker-options-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DockerOptionsFormComponent,
      multi: true,
    },
  ],
})
export class DockerOptionsFormComponent implements OnInit, ControlValueAccessor {

  private options: SimoneDockerOptions;
  private onChangeFn: Function;
  private onTouchedFn: Function;

  constructor(private optionsService: DockerOptionsService) {
  }

  ngOnInit() {
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
  }

  private createDefaultOptions() {
    let options = this.optionsService.getOptions();
    this.options = Object.assign({}, options);
  }
}
