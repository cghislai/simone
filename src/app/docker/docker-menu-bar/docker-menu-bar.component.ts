import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TasksService} from '../services/tasks.service';
import {BackgroundTask} from '../domain/background-task';
import {Observable} from 'rxjs/Observable';

<<<<<<< HEAD
import {SelectItem} from 'primeng/primeng';
import {DockerOptionsService} from '../services/docker-options.service';
import {SimoneDockerOptions} from '../domain/docker-options';
import {DockerHostService} from '../services/docker-host.service';

======
=
>>>>>>>
90
ae2cfb3f77811365ab0177e14caab072673767

@Component({
  selector: 'app-docker-menu-bar',
  templateUrl: './docker-menu-bar.component.html',
  styleUrls: ['./docker-menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DockerMenuBarComponent implements OnInit {

  backgroundTasks: Observable<BackgroundTask[]>;
<<<<<<<
  HEAD
  dockerOptions: Observable<SimoneDockerOptions>;
  dockerOptionsChoices: Observable<SelectItem[]>;
  hasSwarmControl: Observable<boolean>;

  constructor(private tasksService: TasksService,
              private optionsService: DockerOptionsService,
              private hostService: DockerHostService) {
  ======
    =

      constructor(private tasksService: TasksService) {
    >>>>>>>
      90
      ae2cfb3f77811365ab0177e14caab072673767
    }

    ngOnInit() {
      this.backgroundTasks = this.tasksService.getRunningTasks();
      <<<<<<< HEAD

        this.dockerOptionsChoices = this.optionsService.getOptions()
        .filter(o => o != null)
        .map(options => options.map(o => <SelectItem>{
          label: o.label,
          value: o.label,
        }));
      this.dockerOptions = this.optionsService.getCurrentOptionsObservable();
      this.hasSwarmControl = this.hostService.hasSwarmControl().share();
    }

    activeOptionsChanged(label
  :
    string
  )
    {
      this.optionsService.getOptions()
        .map(o => o.find(op => op.label === label))
        .filter(o => o != null)
        .take(1)
        .subscribe(o => this.optionsService.setCurrentOptions(o));
    ======
      =
    >>>>>>>
      90
      ae2cfb3f77811365ab0177e14caab072673767
    }

  }
