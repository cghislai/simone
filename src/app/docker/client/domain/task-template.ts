import {ContainerSpecJson} from './container-spec';
import {RestartPolicyJson} from './restart-policy';

/**
 * Created by cghislai on 5/22/17.
 */

export interface TaskTemplateJson {
  ContainerSpec: ContainerSpecJson;
  Resources: { Limits?: { MemoryBytes?: number, NanoCPUs?: number } }
  RestartPolicy?: RestartPolicyJson;
  Placement: { Constraints?: string[] };
  ForceUpdate: number;
}
