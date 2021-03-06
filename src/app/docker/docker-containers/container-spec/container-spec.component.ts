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
  @Input()
  highlightDiffTo: ContainerSpecJson;

  spec: ContainerSpecJson;

  envLines: string;
  specLabels: string;
  mountsSpecs: string;
  secretSpecs: string;
  configSpecs: string;

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


  onArgsChange(args: string[]) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Args = args; // TODO move in service
    this.setSpec(newSpec);
  }

  onArgsRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Args = [...this.getComparisonSpec().Args];
    this.setSpec(newSpec);
  }

  argsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Args, this.getComparisonSpec().Args);
  }


  onEnvChange(env: string) {
    let envLines = env.split('\n');
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Env = envLines; // TODO move in service
    this.setSpec(newSpec);
  }

  onEnvRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Env = [...this.getComparisonSpec().Env];
    this.setSpec(newSpec);
  }

  envDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Env, this.getComparisonSpec().Env);
  }


  onImageChange(image: string) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Image = image; // TODO move in service
    this.setSpec(newSpec);
  }

  onImageRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Image = this.getComparisonSpec().Image;
    this.setSpec(newSpec);
  }

  imageDiffer() {
    return this.spec.Image != this.getComparisonSpec().Image;
  }

  onLabelsChange(labels: string) {
    let labelsDict = ObjectUtils.stringLinesToDict(labels);
    let newSpec = ObjectUtils.jsonClone(this.spec);
    newSpec.Labels = labelsDict;
    this.setSpec(newSpec);
  }

  onLabelsRollback() {
    this.specLabels = ObjectUtils.dictToLinesString(this.getComparisonSpec().Labels);
    this.spec.Labels = this.getComparisonSpec().Labels;
  }

  labelsDiffer() {
    if (this.getComparisonSpec() == null) {
      return true;
    }
    return this.specLabels != ObjectUtils.dictToLinesString(this.getComparisonSpec().Labels)
  }


  onMountsChange(mounts: string) {
    let mountSpecs = mounts
      .split('\n')
      .map(m => ContainerUtils.parseMountSpec(m));
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Mounts = mountSpecs;
    this.setSpec(newSpec);
  }

  onMountsRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Mounts = [...this.getComparisonSpec().Mounts];
    this.setSpec(newSpec);
  }

  mountsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Mounts, this.getComparisonSpec().Mounts,
      (s1, s2) => {
        return ContainerUtils.stringifyMountSpec(s1)
          === ContainerUtils.stringifyMountSpec(s2);
      });
  }


  onSecretsChange(secrets: string) {
    let secretSpecs = secrets
      .split('\n')
      .map(s => ContainerUtils.parseContainerSecretSpec(s));
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Secrets = secretSpecs; // TODO move in service
    this.setSpec(newSpec);
  }

  onSecretsRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Secrets = [...this.getComparisonSpec().Secrets];
    this.setSpec(newSpec);
  }

  secretsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Secrets, this.getComparisonSpec().Secrets,
      (s1, s2) => {
        return ContainerUtils.stringifyContainerSecretSpec(s1)
          === ContainerUtils.stringifyContainerSecretSpec(s2);
      });
  }


  onConfigsChange(configs: string) {
    let configSpecs = configs
      .split('\n')
      .map(s => ContainerUtils.parseContainerConfigSpec(s));
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Configs = configSpecs; // TODO move in service
    this.setSpec(newSpec);
  }

  onConfigsRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Configs = this.getComparisonSpec().Configs;
    this.setSpec(newSpec);
  }

  configsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Configs, this.getComparisonSpec().Configs,
      (s1, s2) => {
        return ContainerUtils.stringifyContainerConfigSpec(s1)
          === ContainerUtils.stringifyContainerConfigSpec(s2);
      });
  }

  onUserChange(user: string) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.User = user;
    this.setSpec(newSpec);
  }

  onUserRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.User = this.getComparisonSpec().User;
    this.setSpec(newSpec);
  }

  userDiffer() {
    return this.spec.User !== this.getComparisonSpec().User;
  }

  onGroupsChange(groups: string[]) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Groups = [...groups];
    this.setSpec(newSpec);
  }

  onGroupsRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Groups = this.getComparisonSpec().Groups;
    this.setSpec(newSpec);
  }

  groupsDiffer() {
    return ArrayUtils.arrayContentDiffer(this.spec.Groups, this.getComparisonSpec().Groups);
  }


  onDirChange(dir: string) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Dir = dir;
    this.setSpec(newSpec);
  }

  onDirRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Dir = this.getComparisonSpec().Dir;
    this.setSpec(newSpec);
  }

  dirDiffer() {
    return this.spec.Dir !== this.getComparisonSpec().Dir;
  }


  onStopSignalChange(stopSignal: string) {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.StopSignal = stopSignal;
    this.setSpec(newSpec);
  }

  onStopSignalRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.StopSignal = this.getComparisonSpec().StopSignal;
    this.setSpec(newSpec);
  }

  stopSignalDiffer() {
    return this.spec.StopSignal !== this.getComparisonSpec().StopSignal;
  }


  onStopGracePeriodSecondChange(stopGracePeriod: number) {
    let nanoSeconds = stopGracePeriod * 1000000000;
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.StopGracePeriod = nanoSeconds;
    this.setSpec(newSpec);
  }

  onStopGracePeriodRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.StopGracePeriod = this.getComparisonSpec().StopGracePeriod;
    this.setSpec(newSpec);
  }

  stopGracePeriodDiffer() {
    return this.spec.StopGracePeriod !== this.getComparisonSpec().StopGracePeriod;
  }


  onHealthCheckChange(healthCheck: HealthConfig) {
    let newCheck = ObjectUtils.jsonClone(healthCheck);
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Healthcheck = newCheck;
    this.setSpec(newSpec);
  }

  onHealthCheckRollback() {
    let newSpec: ContainerSpecJson = ObjectUtils.jsonClone(this.spec);
    newSpec.Healthcheck = this.getComparisonSpec().Healthcheck;
    this.setSpec(newSpec);
  }

  healthCheckDiffer() {
    if (this.spec == null) {
      return false;
    }
    let newCheckJSON = JSON.stringify(this.spec.Healthcheck);
    let originalCheckJSON = JSON.stringify(this.getComparisonSpec().Healthcheck);
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

  private setSpec(spec: ContainerSpecJson, fireChange = true) {
    this.spec = spec;
    if (spec == null) {
      return;
    }
    this.specLabels = ObjectUtils.dictToLinesString(spec.Labels);
    this.envLines = spec.Env
      .reduce((cur, next) => cur == null ? next : cur + '\n' + next, null);
    this.mountsSpecs = spec.Mounts == null ? '' : spec.Mounts
      .map(m => ContainerUtils.stringifyMountSpec(m))
      .reduce((cur, next) => cur == null ? next : cur + '\n' + next, null);
    this.secretSpecs = spec.Secrets == null ? '' : spec.Secrets
      .map(s => ContainerUtils.stringifyContainerSecretSpec(s))
      .reduce((cur, next) => cur == null ? next : cur + '\n' + next, null);
    this.configSpecs = spec.Configs == null ? '' : spec.Configs
      .map(s => ContainerUtils.stringifyContainerConfigSpec(s))
      .reduce((cur, next) => cur == null ? next : cur + '\n' + next, null);
    if (fireChange) {
      this.fireChange(spec);
    }
  }


  getComparisonSpec() {
    if (this.highlightDiffTo != null) {
      return this.highlightDiffTo;
    }
    return this.originalSpec;
  }

}
