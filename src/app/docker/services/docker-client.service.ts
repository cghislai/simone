import {Injectable} from '@angular/core';
import {DockerClientConfig} from '../domain/docker-client-config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Info} from '../client/domain/info';
import {DockerServerInfo} from '../domain/docker-server-info';

@Injectable()
export class DockerClientConfigService {

  static DEFAULT_CONFIG_LABEL = 'default';

  activeConfig: BehaviorSubject<DockerClientConfig>;
  configList: BehaviorSubject<DockerClientConfig[]>;
  storageKey = 'simone.client-configs';
  storageKeyPrefix = 'simone.client-config';


  constructor() {
    this.activeConfig = new BehaviorSubject<DockerClientConfig>(null);
    this.configList = new BehaviorSubject<DockerClientConfig[]>(this.restoreListFromStorage());

  }

  getActiveConfigNow(): DockerClientConfig {
    return this.activeConfig.getValue();
  }

  getConfigList(): Observable<DockerClientConfig[]> {
    return this.configList;
  }

  getActiveConfig(): Observable<DockerClientConfig> {
    return this.activeConfig
      .filter(c => c != null);
  }

  getActiveConfigNullable(): Observable<DockerClientConfig> {
    return this.activeConfig;
  }

  setActiveConfig(config: DockerClientConfig) {
    this.activeConfig.next(config);
  }

  hasNodeConfig(nodeId: string): Observable<boolean> {
    return this.configList.take(1)
      .map(list => list.find(c => c.serverInfo.swarmNodeId === nodeId) != null);
  }

  getNodeConfig(nodeId: string): Observable<DockerClientConfig> {
    return this.configList.take(1)
      .map(list => list.find(c => c.serverInfo.swarmNodeId === nodeId))
      .filter(c => c != null);
  }

  updateConfigServer(config: DockerClientConfig, info: Info): DockerClientConfig {
    let serverInfo: DockerServerInfo = {
      swarmControl: info.Swarm != null && info.Swarm.ControlAvailable,
      swarm: info.Swarm != null,
      name: info.Name,
      swarmNodeId: info.Swarm == null ? null : info.Swarm.NodeID,
      swarmClusterId: info.Swarm == null || info.Swarm.Cluster == null ? null : info.Swarm.Cluster.ID,
      debug: info.Debug,
    };
    return Object.assign({}, config, {
      serverInfo: serverInfo,
    });
  }

  createDefaultConfig() {
    let config: DockerClientConfig = {
      label: DockerClientConfigService.DEFAULT_CONFIG_LABEL,
      api: {
        endPointUrl: 'https://host:2376',
        version: 'v1.31',
      },
      serverInfo: null,
      heartbeatDelay: 10000,
    };
    return config;
  }


  removeConfig(label: string) {
    this.removeConfigFromStorage(label);
    let filteredList = this.configList.getValue()
      .filter(o => o.label != label);
    this.configList.next(filteredList);
    this.saveConfigListToStorage();

    let currentLabel = this.getActiveConfigNow().label;
    if (currentLabel === label && filteredList.length > 0) {
      this.setActiveConfig(filteredList[0]);
    }
  }

  savetoStorage(config: DockerClientConfig) {
    if (window.localStorage == null) {
      throw 'Window storage required';
    }
    let optionsJson = JSON.stringify(config);
    window.localStorage.setItem(`${this.storageKeyPrefix}.${config.label}`, optionsJson);

    let newValues = [config, ...this.configList.getValue()
      .filter(o => o.label !== config.label)];
    this.configList.next(newValues);
    this.saveConfigListToStorage();
  }

  private saveConfigListToStorage() {
    if (window.localStorage == null) {
      throw 'Window storage required';
    }
    let names = JSON.stringify(
      this.configList.getValue().map(o => o.label));
    window.localStorage.setItem(`${this.storageKey}`, names);
  }

  private restoreListFromStorage(): DockerClientConfig[] {
    if (window.localStorage == null) {
      throw 'Window storage required';
    }
    let json = window.localStorage.getItem(this.storageKey);
    if (json == null) {
      return [];
    }
    let configsLabels: string[] = JSON.parse(json);
    if (configsLabels == null || !(configsLabels instanceof Array )) {
      return [];
    }
    return configsLabels
      .map(label => this.restoreConfigFromStorage(label))
      .filter(c => c != null);
  }

  private restoreConfigFromStorage(label: string): DockerClientConfig {
    if (window.localStorage == null) {
      throw 'Window storage required';
    }
    let json = window.localStorage.getItem(`${this.storageKeyPrefix}.${label}`);
    if (json == null) {
      return null;
    }
    let config: DockerClientConfig = JSON.parse(json);
    return config;
  }

  private removeConfigFromStorage(label: string) {
    if (window.localStorage == null) {
      throw 'Window storage required';
    }
    window.localStorage.removeItem(`${this.storageKeyPrefix}.${label}`);
  }
}
