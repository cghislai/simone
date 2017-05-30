import {ContainerSpecJson} from './container-spec';

/**
 * Created by cghislai on 5/22/17.
 */

export interface TaskTemplateJson {
  ContainerSpec: ContainerSpecJson;
  ForceUpdate: number;
  Placement: { Constraints?: string[] };
  Resources: { Limits?: { MemoryBytes?: number, NanoCPUs?:number } }
  RestartPolicy?: { Condition?: string, MaxAttempts?: number }
}
