import * as moment from 'moment';
import {TaskSpecJson} from '../../../client/domain/task-spec';
import {NetworkAttachmentJson} from '../../../client/domain/network-attachment';

/**
 * Created by cghislai on 5/23/17.
 */

export interface Task {
  id: string;
  version: { Index: string; };
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
  spec: TaskSpecJson;
  serviceID: string;
  slot: number,
  nodeID: string;
  status: {
    Timestamp: string;
    State: string;
    Message: string;
    Err?: string;
    ContainerStatus: {
      ContainerID: string;
      PID: number;
    }
  };
  desiredState: string;
  networksAttachments: NetworkAttachmentJson[];
}
