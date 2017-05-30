import {TaskTemplateJson} from './task-template';

/**
 * Created by cghislai on 5/22/17.
 */
export interface ServiceSpecJson {

  EndpointSpec: {Mode: string};
  Labels: {[key:string]:string};
  Mode: {Replicated?: {Replicas: number}};
  Name: string;
  Networks: {Target: string, Aliases: string[]}[];
  TaskTemplate: TaskTemplateJson;
}
