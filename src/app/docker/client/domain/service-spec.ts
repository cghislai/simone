import {TaskTemplateJson} from './task-template';
import {EndpointSpec} from './endpoint-spec';
import {ServiceMode} from './service-mode';

/**
 * Created by cghislai on 5/22/17.
 */
export interface ServiceSpecJson {

  EndpointSpec: EndpointSpec;
  Labels: { [key: string]: string };
  Mode: ServiceMode;
  Name: string;
  Networks: { Target: string, Aliases: string[] }[];
  TaskTemplate: TaskTemplateJson;
}
