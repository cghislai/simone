import {ServiceMode} from './service-mode';
import {TaskTemplateJson} from '../../client/domain/task-template';

/**
 * Created by cghislai on 5/22/17.
 */

export interface ServiceSpec {
  endPointSpec: { Mode: string };
  labels: { [key: string]: string };
  mode: {
    mode: ServiceMode,
    replicas?: number
  };
  name: string;
  networks: { Target: string, Aliases: string[] }[];
  taskTemplate: TaskTemplateJson;
}
