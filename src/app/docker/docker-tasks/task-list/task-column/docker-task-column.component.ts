import {Component, Input, OnInit} from '@angular/core';
import {TASK_COLUMN_DATA, TaskColumn} from '../taskColumn';
import {Task} from '../../../domain/tasks/task';
import {ColumnData} from '../../../domain/column-data';
import {DockerNodesService} from '../../../services/docker-nodes.service';
import {DockerServicesService} from '../../../services/docker-services.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-docker-task-column',
  templateUrl: './docker-task-column.component.html',
  styleUrls: ['./docker-task-column.component.scss'],
})
export class DockerTaskColumnComponent implements OnInit {


  @Input()
  column: TaskColumn;
  @Input()
  task: Task;

  taskColumn = TaskColumn;
  columnData: ColumnData;

  nodeLabel: Observable<string>;
  serviceLabel: Observable<string>;

  constructor(private nodeService: DockerNodesService,
              private serviceService: DockerServicesService) {

  }

  ngOnInit() {
    this.columnData = TASK_COLUMN_DATA[this.column];
    if (this.task != null) {
      this.nodeLabel = this.getNodeLabel(this.task.nodeID);
      this.serviceLabel = this.getServiceLabel(this.task.serviceID);
    }
  }

  private getNodeLabel(id: string): Observable<string> {
    return Observable.concat(Observable.of(id),
      this.nodeService.getAll()
        .map(nodes => nodes.find(n => n.ID === id))
        .filter(node => node != null)
        .map(node => node.Description.Hostname),
    );
  }

  private getServiceLabel(id: string): Observable<string> {
    return Observable.concat(Observable.of(id),
      this.serviceService.getAll()
        .map(services => services.find(s => s.id === id))
        .filter(service => service != null)
        .map(service => service.spec.Name),
    );
  }
}
