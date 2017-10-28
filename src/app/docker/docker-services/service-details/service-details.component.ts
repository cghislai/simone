import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Service} from '../../domain/services/service';
import {TaskFilter} from '../../client/domain/task-filter';
import {TaskColumn} from '../../docker-tasks/task-list/taskColumn';
import {ServiceSpec} from '../../client/domain/service-spec';
import {DockerServicesService} from '../../services/docker-services.service';
import {ObjectUtils} from '../../../utils/ObjectUtils';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit, OnChanges {

  @Input()
  service: Service;
  @Output()
  serviceChanged = new EventEmitter<any>();

  taskFilter: TaskFilter;
  taskColumns: TaskColumn[];

  originalSpec: ServiceSpec;
  editingSpec: ServiceSpec;
  previousSpec: ServiceSpec;
  specTouched: boolean = false;

  constructor(private dockerService: DockerServicesService) {
  }

  ngOnInit() {
    this.taskFilter = {
      service: [this.service.id],
      desiredState: ['running'],
      id: [],
      label: [],
      name: [],
    };
    this.taskColumns = [
      TaskColumn.SLOT,
      TaskColumn.ID,
      TaskColumn.CONTAINER,
      TaskColumn.NODE,
      TaskColumn.IMAGE,
      TaskColumn.DESIRED_STATE,
      TaskColumn.STATE,
      TaskColumn.MESSAGE,
    ]
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['service'] != null) {
      this.originalSpec = ObjectUtils.jsonClone(this.service.spec);
      this.previousSpec = this.service.previousSpec;
      if (!this.specTouched) {
        this.editingSpec = ObjectUtils.jsonClone(this.service.spec);
      }
    }
  }

  onTaskFilterDesiredStateChange(states: string[]) {
    let newFilter = Object.assign({}, this.taskFilter);
    newFilter.desiredState = states;
    this.taskFilter = newFilter;
  }

  onUpdateClicked() {
    this.dockerService.update(this.service.id, this.service.version, this.editingSpec)
      .subscribe(result => {
        this.serviceChanged.next(true);
        this.specTouched = false;
      });
  }

  onRevertClicked() {
    let newSpec = ObjectUtils.jsonClone(this.originalSpec);
    this.editingSpec = newSpec;
    this.specTouched = false;
  }

  onRollbackClicked() {
    this.dockerService.rollback(this.service.id, this.service.version, this.originalSpec)
      .subscribe(r => this.serviceChanged.next(true));
  }

  isUpdating() {
    let updateStatus = this.service.updateStatus;
    if (updateStatus == null) {
      return false;
    }
    return updateStatus.StartedAt != null && updateStatus.CompletedAt == null
      && ( updateStatus.State == 'updating' || updateStatus.State == 'rollback_started');
  }

  onSpecTouched() {
    this.specTouched = true;
  }

}
