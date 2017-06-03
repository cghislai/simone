import {TaskTemplateJson} from './task-template';
import {EndpointSpec} from './endpoint-spec';
import {ServiceMode} from './service-mode';

/**
 * Created by cghislai on 5/22/17.
 */
export interface ServiceSpecJson {

  Name: string;
  Labels: { [key: string]: string };
  TaskTemplate: TaskTemplateJson;
  Mode: ServiceMode;
  Networks: { Target: string, Aliases: string[] }[];
  EndpointSpec: EndpointSpec;
}
