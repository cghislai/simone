import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Message, SelectItem} from 'primeng/primeng';
import {Observable} from 'rxjs/Observable';
import {ObjectUtils} from '../../utils/ObjectUtils';
import {DockerClientConfigService} from '../services/docker-client.service';
import {DockerClientConfig} from '../domain/docker-client-config';
import {DockerServerInfo} from '../domain/docker-server-info';
import {DockerClient} from '../client/docker.client';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-docker-options-page',
  templateUrl: './docker-options-page.component.html',
  styleUrls: ['./docker-options-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DockerOptionsPageComponent implements OnInit {

  newConfigSource: Subject<DockerClientConfig>;
  messages: Message[] = [];
  config: Observable<DockerClientConfig>;
  configLabel: Observable<string>;
  configRemovable: Observable<boolean>;
  configList: Observable<SelectItem[]>;

  hasconfigServer: Observable<boolean>;
  configServer: Observable<DockerServerInfo>;
  configServerName: Observable<string>;
  configServerSwarmMode: Observable<boolean>;
  configServerSwarmControl: Observable<boolean>;
  configServerSwarmNodeId: Observable<string>;
  configServerSwarmNodeLink: Observable<any[]>;

  constructor(private configService: DockerClientConfigService,
              private client: DockerClient) {
  }

  ngOnInit() {
    this.newConfigSource = new Subject<DockerClientConfig>();
    this.configList = this.configService.getConfigList()
      .filter(o => o != null)
      .map(options => options.map(o => <SelectItem>{
        label: o.label,
        value: o.label,
      }))
      .map(list => [{
        label: 'Select config',
        value: null,
      }, ...list]);
    this.config = Observable.merge(
      Observable.of(this.configService.createDefaultConfig()),
      this.newConfigSource,
      this.configService.getActiveConfig(),
    )
      .map(config => ObjectUtils.jsonClone(config))
      .filter(c => c != null)
      .share();
    this.configLabel = this.config
      .map(config => config == null ? null : config.label);
    this.configRemovable = this.config
      .map(c => c.label === DockerClientConfigService.DEFAULT_CONFIG_LABEL);
    this.configServer = this.configService
      .getActiveConfig()
      .map(c => c.serverInfo)
      .share();
    this.hasconfigServer = this.configServer
      .map(s => s != null);
    this.configServerName = this.configServer
      .map(s => s.name);
    this.configServerSwarmMode = this.configServer
      .map(s => s.swarm);
    this.configServerSwarmControl = this.configServer
      .map(s => s.swarmControl);
    this.configServerSwarmNodeId = this.configServer
      .map(s => s.swarmNodeId);
    this.configServerSwarmNodeLink = this.configServer
      .map(s => ['/docker/nodes', s.swarmNodeId]);
  }

  activeOptionsChanged(label: string) {
    this.configService.getConfigList()
      .map(o => o.find(op => op.label === label))
      .filter(o => o != null)
      .take(1)
      .subscribe(o => this.configService.setActiveConfig(o));
  }

  onNewOptionsClicked() {
    let config = this.configService.createDefaultConfig();
    this.newConfigSource.next(config);
  }

  onRemoveOptionsClicked() {
    let config = this.configService.getActiveConfigNow();
    this.configService.removeConfig(config.label);
  }

  onConfigEditChange(config: DockerClientConfig) {
    this.client.info(config)
      .map(info => this.configService.updateConfigServer(config, info))
      .subscribe(conf => {
        this.configService.savetoStorage(conf);
        this.configService.setActiveConfig(conf);
        this.messages.push({
          severity: 'success',
          summary: 'Saved',
          detail: 'Options have been saved',
        });
      }, error => {
        this.messages.push({
          severity: 'error',
          summary: 'Server unreachable',
          detail: 'Unable to contact the server',
        });
        console.error(error);
      });
  }

  onConfigEditCancel() {
    let config = this.configService.getActiveConfigNow();
    this.configService.setActiveConfig(config);
  }
}
