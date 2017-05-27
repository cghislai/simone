import {Component, OnDestroy, OnInit} from '@angular/core';
import {DockerService} from '../../services/docker.service';
import {ActivatedRoute} from '@angular/router';
import {DockerTasksService} from '../../services/docker-tasks.service';
import {Observable} from 'rxjs/Observable';
import {Task} from '../../domain/tasks/task';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-task-details-page',
  templateUrl: './task-details-page.component.html',
  styleUrls: ['./task-details-page.component.scss'],
})
export class TaskDetailsPageComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
  private id: number;
  private task: Task;

  constructor(private activatedRoute: ActivatedRoute,
              private taskService: DockerTasksService,
              private dockerService: DockerService) {
  }

  ngOnInit() {
    let id = this.activatedRoute.params
      .filter(param => param != null)
      .map(params => params['id'])
      .filter(param => param != null)
      .distinctUntilChanged();
    let ping = this.dockerService.getReachableObservable();

    this.subscription = Observable.combineLatest(id, ping)
      .map(results => results[0])
      .subscribe(id => this.fetchTask(id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchTask(id: string) {
    this.taskService.inspect(id)
      .subscribe(task => this.task = task);
  }
}