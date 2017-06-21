import {TaskTemplateJson} from './task-template';
import {EndpointSpec} from './endpoint-spec';
import {ServiceMode} from './service-mode';
import {NetworkSpec} from './network-spec';
import {ServiceUpdateConfig} from './service-update-config';

/**
 * Created by cghislai on 5/22/17.
 */
export interface ServiceSpec {

  Name: string;
  Labels: { [key: string]: string };
  TaskTemplate: TaskTemplateJson;
  Mode: ServiceMode;
  Networks: NetworkSpec[];
  EndpointSpec: EndpointSpec;
  UpdateConfig: ServiceUpdateConfig;
  RollbackConfig: ServiceUpdateConfig;
}
