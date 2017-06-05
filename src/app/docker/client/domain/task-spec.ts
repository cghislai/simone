/**
 * Created by cghislai on 5/23/17.
 */
import {ContainerSpecJson} from './container-spec';

export interface TaskSpecJson {
  ContainerSpec: ContainerSpecJson
  Resources: {
    Limits: any,
    Reservations: any
  };
  RestartPolicy: {
    Condition: string,
    MaxAttempts: number
  };
  Placement: any;
}
