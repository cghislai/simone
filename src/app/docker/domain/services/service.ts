import * as moment from 'moment';
import {EndPointJson} from '../../client/domain/endpoint';
import {ServiceSpecJson} from '../../client/domain/service-spec';

/**
 * Created by cghislai on 5/22/17.
 */

export interface Service {
  createdAt: moment.Moment;
  endPoint: EndPointJson;
  id: string;
  spec: ServiceSpecJson;
  previousSpec?: ServiceSpecJson;
  updateStatus: { StartedAt: string, CompletedAt?: string, State?: string, Message?: string };
  updatedAt: moment.Moment;
  version: any;
}
