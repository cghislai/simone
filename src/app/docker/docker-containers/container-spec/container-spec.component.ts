import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContainerSpecJson} from '../../client/domain/container-spec';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ObjectUtils} from '../../../utils/ObjectUtils';
import {ArrayUtils} from '../../../utils/array-utils';
import {ContainerUtils} from '../container-utils';
import {HealthConfig} from '../../client/domain/health-config';

@Component({
  selector: 'app-container-spec',
  templateUrl: './container-spec.component.html',
  styleUrls: ['./container-spec.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ContainerSpecComponent,
    multi: true,
  }],
})
export class ContainerSpecComponent implements OnInit, ControlValueAccessor {


  @Input()
  editable: boolean;

  spec: ContainerSpecJson;

  specLabels: string[];
  mountsSpecs: string[];
  secretSpecs: string[];

  private specTouched: boolean;
  private originalSpec: ContainerSpecJson;

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


  onArgsChange(args: string[]) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Args = args; // TODO move in service
    this.setSpec(newSpec);
  }

  onArgsRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Args = [...this.originalSpec.Args];
    this.setSpec(newSpec);
  }

  argsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Args, this.originalSpec.Args);
  }


  onEnvChange(env: string[]) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Env = env; // TODO move in service
    this.setSpec(newSpec);
  }

  onEnvRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Env = [...this.originalSpec.Env];
    this.setSpec(newSpec);
  }

  envDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Env, this.originalSpec.Env);
  }


  onImageChange(image: string) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Image = image; // TODO move in service
    this.setSpec(newSpec);
  }

  onImageRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Image = this.originalSpec.Image;
    this.setSpec(newSpec);
  }

  imageDiffer() {
    return this.spec.Image != this.originalSpec.Image;
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


  onMountsChange(mounts: string[]) {
    let mountSpecs = mounts.map(m => ContainerUtils.parseMountSpec(m));
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Mounts = mountSpecs;
    this.setSpec(newSpec);
  }

  onMountsRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Mounts = [...this.originalSpec.Mounts];
    this.setSpec(newSpec);
  }

  mountsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Mounts, this.originalSpec.Mounts,
      (s1, s2) => {
        return ContainerUtils.stringifyMountSpec(s1)
          === ContainerUtils.stringifyMountSpec(s2);
      });
  }


  onSecretsChange(secrets: string[]) {
    let secretSpecs = secrets.map(s => ContainerUtils.parseContainerSecretSpec(s));
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Secrets = secretSpecs; // TODO move in service
    this.setSpec(newSpec);
  }

  onSecretsRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Secrets = [...this.originalSpec.Secrets];
    this.setSpec(newSpec);
  }

  secretsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Secrets, this.originalSpec.Secrets,
      (s1, s2) => {
        return ContainerUtils.stringifyContainerSecretSpec(s1)
          === ContainerUtils.stringifyContainerSecretSpec(s2);
      });
  }


  onUserChange(user: string) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.User = user;
    this.setSpec(newSpec);
  }

  onUserRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.User = this.originalSpec.User;
    this.setSpec(newSpec);
  }

  userDiffer() {
    return this.spec.User !== this.originalSpec.User;
  }

  onGroupsChange(groups: string[]) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Groups = [...groups];
    this.setSpec(newSpec);
  }

  onGroupsRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Groups = this.originalSpec.Groups;
    this.setSpec(newSpec);
  }

  groupsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Groups, this.originalSpec.Groups);
  }


  onDirChange(dir: string) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Dir = dir;
    this.setSpec(newSpec);
  }

  onDirRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Dir = this.originalSpec.Dir;
    this.setSpec(newSpec);
  }

  dirDiffer() {
    return this.spec.Dir !== this.originalSpec.Dir;
  }


  onStopSignalChange(stopSignal: string) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.StopSignal = stopSignal;
    this.setSpec(newSpec);
  }

  onStopSignalRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.StopSignal = this.originalSpec.StopSignal;
    this.setSpec(newSpec);
  }

  stopSignalDiffer() {
    return this.spec.StopSignal !== this.originalSpec.StopSignal;
  }


  onStopGracePeriodSecondChange(stopGracePeriod: number) {
    let nanoSeconds = stopGracePeriod * 1000000000;
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.StopGracePeriod = nanoSeconds;
    this.setSpec(newSpec);
  }

  onStopGracePeriodRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.StopGracePeriod = this.originalSpec.StopGracePeriod;
    this.setSpec(newSpec);
  }

  stopGracePeriodDiffer() {
    return this.spec.StopGracePeriod !== this.originalSpec.StopGracePeriod;
  }


  onHealthCheckChange(healthCheck: HealthConfig) {
    let newCheck = ObjectUtils.jsonClone(healthCheck);
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Healthcheck = newCheck;
    this.setSpec(newSpec);
  }

  onHealthCheckRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Healthcheck = this.originalSpec.Healthcheck;
    this.setSpec(newSpec);
  }

  healthCheckDiffer() {
    if (this.spec == null) {
      return false;
    }
    let newCheckJSON = JSON.stringify(this.spec.Healthcheck);
    let originalCheckJSON = JSON.stringify(this.originalSpec.Healthcheck);
    return newCheckJSON !== originalCheckJSON;
  }



  private firetouched() {
    this.specTouched = true;
    this.onTouchedFunction();
    this.touched.next(true);
  }

  private fireChange(spec: ContainerSpecJson) {
    this.onChangeFunction(spec);
  }


  private initOptions() {

  }

  private setSpec(spec: ContainerSpecJson) {
    this.spec = spec;
    if (spec == null) {
      return;
    }
    this.specLabels = ObjectUtils.dictToArray(spec.Labels);
    this.mountsSpecs = spec.Mounts == null ? [] : spec.Mounts
      .map(m => ContainerUtils.stringifyMountSpec(m));
    this.secretSpecs = spec.Secrets == null ? [] : spec.Secrets
      .map(s => ContainerUtils.stringifyContainerSecretSpec(s));
    this.fireChange(spec);
  }

}
