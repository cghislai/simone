import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DockerTasksService} from '../services/docker-tasks.service';
import {DockerService} from '../services/docker.service';
import {Task} from '../../domain/tasks/task';
import {TaskFilter} from '../../client/domain/task-filter';

@Component({
  selector: 'app-docker-task-list',
  templateUrl: './docker-task-list.component.html',
  styleUrls: ['./docker-task-list.component.scss'],
})
export class DockerTaskListComponent implements OnInit {


  filter: {filters: any};
  tasks: Observable<Task[]>;

  constructor(private dockerService: DockerService,
              private tasksService: DockerTasksService) {
  }

  ngOnInit() {
    this.filter = {filters: {}};
    this.filter.filters['desired-state'] = ['running'];

    this.tasks = this.dockerService.getPingResultObservable()
      .filter(r => r)
      .mergeMap(r => this.tasksService.list(this.filter));
  }

}
