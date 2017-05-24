import {TaskSpecJson} from './task-spec';
import {NetworkAttachmentJson} from './network-attachment';

/**
 * Created by cghislai on 5/23/17.
 */
export interface TaskJson {
  ID: string;
  Version: { Index: string; };
  CreatedAt: string;
  UpdatedAt: string;
  Spec: TaskSpecJson;
  ServiceID: string;
  Slot: number,
  NodeID: string;
  Status: {
    Timestamp: string;
    State: string;
    Message: string;
    ContainerStatus: {
      ContainerID: string;
      PID: number;
    }
  };
  DesiredState: string;
  NetworksAttachments: NetworkAttachmentJson[];
}
