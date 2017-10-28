import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {BackgroundTask} from '../domain/background-task';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {ErrorService} from './error.service';
import 'rxjs/add/operator/delay';

@Injectable()
export class TasksService {

  private REMOVAL_DELAY = 5000;
  private taskCounter = 0;
  private runningTasks = new BehaviorSubject<BackgroundTask[]>([]);
  private completedTask = new Subject<BackgroundTask>();
  private erroredTask = new Subject<BackgroundTask>();
  private subscriptions: { [key: number]: Subscription } = {};

  constructor(private errorService: ErrorService) {
  }

  add(task: BackgroundTask): Observable<any> {
    let id = this.taskCounter;
    this.taskCounter = this.taskCounter + 1;
    task.id = id;

    let content = task.content.share();

    let removalSubscription = content
      .delay(this.REMOVAL_DELAY)
      .subscribe(null, null, () => this.removeTask(id));
    let completionSubscription = content
      .subscribe(() => this.completedTask.next(task),
        e => this.onError(task, e));

    let subscription = new Subscription();
    subscription.add(removalSubscription);
    subscription.add(completionSubscription);
    this.subscriptions[id] = subscription;

    let runningTasks = this.runningTasks.getValue();
    let newTasks: BackgroundTask[] = [...runningTasks, task];
    this.runningTasks.next(newTasks);

    return content;
  }

  cancel(id: number) {
    let subscription = this.subscriptions[id];
    if (subscription == null) {
      return;
    }
    subscription.unsubscribe();
  }

  getRunningTasks(): Observable<BackgroundTask[]> {
    return this.runningTasks.asObservable();
  }

  getCompletedTasks(): Observable<BackgroundTask> {
    return this.completedTask.asObservable();
  }

  private onError(task: BackgroundTask, error: any) {
    task.error = error;
    this.erroredTask.next(task);
  }

  private removeTask(id: number) {
    let currentTasks = this.runningTasks.getValue();
    let newTasks = currentTasks
      .filter(task => task.id !== id);
    this.runningTasks.next(newTasks);
    this.subscriptions[id].unsubscribe();
    delete this.subscriptions[id];
  }
}
