import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DockerClientConfigService} from '../services/docker-client.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-unique-id',
  templateUrl: './unique-id.component.html',
  styleUrls: ['./unique-id.component.scss'],
})
export class UniqueIdComponent implements OnInit {

  @Input()
  id: string;
  @Input()
  type: string;
  @Input()
  label: string;
  @Input()
  nodeId: string;

  @Input()
  noTrim: boolean;
  @Input()
  trimWidthEm: number = 6;

  path: string;

  constructor(private router: Router,
              private configService: DockerClientConfigService) {
  }

  ngOnInit() {
    this.path = `${this.type}s`;
  }

  getMaxWidthCss(): string {
    return this.noTrim ? null : `${this.trimWidthEm}em`;
  }

  onClick() {
    this.checkNodeConfig()
      .subscribe(null, null, () => {
        this.router.navigate(['/docker', this.path, this.id]);
      });
  }

  private checkNodeConfig(): Observable<any> {
    if (this.nodeId == null) {
      return Observable.empty();
    }
    let config = this.configService.getActiveConfigNow();
    if (config == null) {
      return Observable.empty();
    }
    let serverInfo = config.serverInfo;
    if (serverInfo == null) {
      return Observable.empty();
    }
    let serverNodeId = serverInfo.swarmNodeId;
    if (serverNodeId == null || serverNodeId == this.nodeId) {
      return Observable.empty();
    }

    return this.configService.getConfigList()
      .take(1)
      .map(list => list.filter(config => config.serverInfo != null)
        .find(config => config.serverInfo.swarmNodeId == this.nodeId))
      .filter(config => config != null)
      .do(config => {
        this.configService.setActiveConfig(config);
      });
  }
}
