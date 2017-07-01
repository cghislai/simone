import {Injectable} from '@angular/core';
import {SimoneDockerOptions} from '../domain/docker-options';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {ObjectUtils} from '../../utils/ObjectUtils';

@Injectable()
export class DockerOptionsService {

  private options: BehaviorSubject<SimoneDockerOptions[]>;
  private activeOptions: BehaviorSubject<SimoneDockerOptions>;
  private storageOptionsKey = 'simone.options';
  private storageOptionsKeyPrefix = 'simone.options';

  constructor() {
    let options: SimoneDockerOptions[] = this.restoreFromStorage();
    if (options == null || options.length < 1) {
      options = [this.createDefaultOptions()];
    }
    this.options = new BehaviorSubject<SimoneDockerOptions[]>(options);
    this.activeOptions = new BehaviorSubject<SimoneDockerOptions>(null);
    this.setCurrentOptions(options[0])
  }

  getOptions(): Observable<SimoneDockerOptions[]> {
    return this.options;
  }

  getCurrentOptionsObservable(): Observable<SimoneDockerOptions> {
    return this.activeOptions.asObservable();
  }

  getCurrentOptions(): SimoneDockerOptions {
    return this.activeOptions.getValue();
  }

  setCurrentOptions(options: SimoneDockerOptions) {
    let clone = ObjectUtils.jsonClone(options);
    this.savetoStorage(clone);
    this.activeOptions.next(clone);
  }

  removeOptions(label: string) {
    let options = this.options.getValue();
    let newOptions = options.filter(o => o.label != label);
    this.removeOptionsFromStorage(label);
    this.options.next(newOptions);
    this.saveOptionsListToStorage();

    let newSelectionOptions = newOptions[0];
    this.setCurrentOptions(newSelectionOptions);
  }

  createDefaultOptions() {
    let options: SimoneDockerOptions = {
      label: 'default',
      mode: 'tcp',
      url: 'http://hosta:4242',
      timeout: 6,
      heartbeatDelay: 0,
      socketPath: '',
      version: 'v1.29',
    };
    return options;
  }

  private savetoStorage(options: SimoneDockerOptions) {
    if (window.localStorage == null) {
      throw 'Window storage required';
    }
    let optionsJson = JSON.stringify(options);
    window.localStorage.setItem(`${this.storageOptionsKeyPrefix}.${options.label}`, optionsJson);

    let newValues = [options, ...this.options.getValue()
      .filter(o => o.label !== options.label)];
    this.options.next(newValues);
    this.saveOptionsListToStorage();
  }

  private saveOptionsListToStorage() {
    if (window.localStorage == null) {
      throw 'Window storage required';
    }
    let names = JSON.stringify(
      this.options.getValue().map(o => o.label));
    window.localStorage.setItem(`${this.storageOptionsKey}`, names);
  }

  private restoreFromStorage() {
    if (window.localStorage == null) {
      throw 'Window storage required';
    }
    let json = window.localStorage.getItem(this.storageOptionsKey);
    if (json == null) {
      return [];
    }
    let options: string[] = JSON.parse(json);
    if (options == null || !(options instanceof Array )) {
      return [];
    }
    return options
      .map(label => this.restoreOptionsFromStorage(label))
  }

  private restoreOptionsFromStorage(label: string): SimoneDockerOptions {
    if (window.localStorage == null) {
      throw 'Window storage required';
    }
    let json = window.localStorage.getItem(`${this.storageOptionsKeyPrefix}.${label}`);
    if (json == null) {
      return null;
    }
    let options: SimoneDockerOptions = JSON.parse(json);
    return options;
  }

  private removeOptionsFromStorage(label: string) {
    if (window.localStorage == null) {
      throw 'Window storage required';
    }
    window.localStorage.removeItem(`${this.storageOptionsKeyPrefix}.${label}`);
  }
}
