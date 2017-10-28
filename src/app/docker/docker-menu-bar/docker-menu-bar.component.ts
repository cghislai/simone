import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TasksService} from '../services/tasks.service';
import {BackgroundTask} from '../domain/background-task';
import {Observable} from 'rxjs/Observable';
import {SelectItem} from 'primeng/primeng';
import {DockerClientConfigService} from '../services/docker-client.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-docker-menu-bar',
  templateUrl: './docker-menu-bar.component.html',
  styleUrls: ['./docker-menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DockerMenuBarComponent implements OnInit {

  backgroundTasks: Observable<BackgroundTask[]>;
  configLabel: Observable<string>;
  configList: Observable<SelectItem[]>;
  swarmControl: Observable<boolean>;

  constructor(private tasksService: TasksService,
              private configService: DockerClientConfigService) {
  }

  ngOnInit() {
    this.backgroundTasks = this.tasksService.getRunningTasks();

    this.configList = this.configService.getConfigList()
      .map(options => options.map(o => <SelectItem>{
        label: o.label,
        value: o.label,
      }))
      .map(list => [{
        label: 'Select config',
        value: null,
      }, ...list]);
    this.configLabel = this.configService.getActiveConfig()
      .map(c => c.label);
    this.swarmControl = this.configService.getActiveConfig()
      .map(c => c.serverInfo)
      .map(c => c != null && c.swarmControl);
  }

  activeOptionsChanged(label: string) {
    this.configService.getConfigList()
      .take(1)
      .map(o => o.find(op => op.label === label))
      .filter(o => o != null)
      .subscribe(o => this.configService.setActiveConfig(o));
  }

}
