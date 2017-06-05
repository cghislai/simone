import {Injectable} from '@angular/core';
import {Service} from '../domain/services/service';
import {Task} from '../domain/tasks/task';

@Injectable()
export class DockerStacksService {

  public DOCKER_STACK_LABEL_NAMESPACE = 'com.docker.stack.namespace';

  constructor() {
  }


  extractServicesStackNames(services: Service[]): string[] {
    return services
      .map(service => this.extractServiceStack(service))
      .filter(name => name != null)
      .reduce((cur, next) => this.appendNoDuplicate(cur, next), []);
  }

  extractTasksStackNames(tasks: Task[]): string[] {
    return tasks
      .map(task => this.extractTaskStack(task))
      .filter(name => name != null)
      .reduce((cur, next) => this.appendNoDuplicate(cur, next), []);
  }


  extractLabelsObjectStackName(labels: { [key: string]: string }): string {
    if (labels == null) {
      return null;
    }
    let labelKeys = Reflect.ownKeys(labels);
    let stacklabelKey = labelKeys.find(key => key === this.DOCKER_STACK_LABEL_NAMESPACE);
    if (stacklabelKey == null) {
      return null;
    }
    return labels[stacklabelKey];
  }

  extractLabelListStackName(labels: string[]): string[] {
    return labels.filter(label => this.isStackLabel(label))
      .map(label => label.split('=')[1])
      .reduce((cur, next) => this.appendNoDuplicate(cur, next), []);
  }

  isStackLabel(label: string): boolean {
    return label.indexOf(this.DOCKER_STACK_LABEL_NAMESPACE) === 0;
  }

  createStackLabel(stackName: string): string {
    return `${this.DOCKER_STACK_LABEL_NAMESPACE}=${stackName}`;
  }

  private extractServiceStack(service: Service): string {
    let labels = service.spec.Labels;
    return this.extractLabelsObjectStackName(labels);
  }

  private extractTaskStack(task: Task): string {
    let labels = task.spec.ContainerSpec.Labels;
    return this.extractLabelsObjectStackName(labels);
  }

  private appendNoDuplicate(cur: string[], next: string): string[] {
    if (cur.indexOf(next) < 0) {
      cur.push(next);
    }
    return cur;
  }
}
