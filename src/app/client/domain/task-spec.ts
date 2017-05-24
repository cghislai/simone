/**
 * Created by cghislai on 5/23/17.
 */
export interface TaskSpecJson {
  ContainerSpec: {
    Image: string;
  };
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
