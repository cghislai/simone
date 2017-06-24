import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TasksService} from '../services/tasks.service';
import {BackgroundTask} from '../domain/background-task';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-docker-menu-bar',
  templateUrl: './docker-menu-bar.component.html',
  styleUrls: ['./docker-menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DockerMenuBarComponent implements OnInit {

  backgroundTasks: Observable<BackgroundTask[]>;

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.backgroundTasks = this.tasksService.getRunningTasks();
  }

}
