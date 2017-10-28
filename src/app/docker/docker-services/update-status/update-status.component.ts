import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ServiceUpdateStatus} from '../../client/domain/service-update-status';
import * as moment from 'moment';
import {ServiceUtils} from '../service-utils';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss'],
})
export class UpdateStatusComponent implements OnInit, OnChanges {

  @Input()
  private updateStatus: ServiceUpdateStatus;
  @Input()
  showMessage: boolean = true;

  updating: boolean;
  updateCompleted: boolean;
  updateInError: boolean;
  updatePaused: boolean;
  startedAt: moment.Moment;
  completedAt: moment.Moment;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updateStatus']) {
      if (this.updateStatus == null) {
        this.updating = false;
        this.updateInError = false;
        this.updateCompleted = false;
        this.updatePaused = false;
        this.updateInError = false;
        this.startedAt = null;
        this.completedAt = null;
      } else {
        this.updating = ServiceUtils.isUpdateInProgress(this.updateStatus);
        this.updateCompleted = ServiceUtils.isUpdateCompleted(this.updateStatus);
        this.updateInError = ServiceUtils.isUpdateInError(this.updateStatus);
        this.updatePaused = this.updateStatus.State == 'paused';
        this.startedAt = moment(this.updateStatus.StartedAt);
        this.completedAt = moment(this.updateStatus.CompletedAt);
      }
    }
  }

}
