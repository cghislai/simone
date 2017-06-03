import {ContainerSpecJson} from './container-spec';

/**
 * Created by cghislai on 5/22/17.
 */

export interface TaskTemplateJson {
  ContainerSpec: ContainerSpecJson;
  Resources: { Limits?: { MemoryBytes?: number, NanoCPUs?:number } }
  RestartPolicy?: { Condition?: string, MaxAttempts?: number }
  Placement: { Constraints?: string[] };
  ForceUpdate: number;
}
