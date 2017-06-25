import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TasksService} from '../services/tasks.service';
import {BackgroundTask} from '../domain/background-task';
import {Observable} from 'rxjs/Observable';
import {DockerHostService} from '../services/docker-host.service';
import {DockerOptionsService} from '../services/docker-options.service';
import {SelectItem} from 'primeng/primeng';
import {SimoneDockerOptions} from '../domain/docker-options';


@Component({
  selector: 'app-docker-menu-bar',
  templateUrl: './docker-menu-bar.component.html',
  styleUrls: ['./docker-menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DockerMenuBarComponent implements OnInit {

  backgroundTasks: Observable<BackgroundTask[]>;
  dockerOptions: Observable<SimoneDockerOptions>;
  dockerOptionsChoices: Observable<SelectItem[]>;
  hasSwarmControl: Observable<boolean>;

  constructor(private tasksService: TasksService,
              private optionsService: DockerOptionsService,
              private hostService: DockerHostService) {
  }

  ngOnInit() {
    this.backgroundTasks = this.tasksService.getRunningTasks();

    this.dockerOptionsChoices = this.optionsService.getOptions()
      .filter(o => o != null)
      .map(options => options.map(o => <SelectItem>{
        label: o.label,
        value: o.label,
      }));
    this.dockerOptions = this.optionsService.getCurrentOptionsObservable();
    this.hasSwarmControl = this.hostService.hasSwarmControl().share();
  }

  activeOptionsChanged(label: string) {
    this.optionsService.getOptions()
      .map(o => o.find(op => op.label === label))
      .filter(o => o != null)
      .take(1)
      .subscribe(o => this.optionsService.setCurrentOptions(o));
  }

}
