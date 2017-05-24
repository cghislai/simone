import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../domain/tasks/task';
import * as moment from 'moment';

@Component({
  selector: 'app-docker-task',
  templateUrl: './docker-task.component.html',
  styleUrls: ['./docker-task.component.scss'],
})
export class DockerTaskComponent implements OnInit {

  @Input()
  task: Task;

  constructor() {
  }

  ngOnInit() {
  }

  getCreatedSinceLabel() {
    return moment(this.task.createdAt).fromNow();
  }

  getUpdatedSinceLabel() {
    if (this.task.updatedAt == null) {
      return null;
    }
    return moment(this.task.updatedAt).fromNow();
  }

}
