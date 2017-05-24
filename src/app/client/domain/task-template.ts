import {ContainerSpecJson} from './container-spec';

/**
 * Created by cghislai on 5/22/17.
 */

export interface TaskTemplateJson {
  ContainerSpec: ContainerSpecJson;
  ForceUpdate: number;
  Placement: { Constaints?: string[] };
  Resources: { Limits?: { MemoryBytes: number } }
  RestartPolicy?: { Condition?: string, MaxAttempts?: number }
}
