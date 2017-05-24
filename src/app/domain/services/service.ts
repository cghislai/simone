import * as moment from 'moment';
import {ServiceSpec} from './service-spec';
import {EndPointJson} from '../../client/domain/endpoint';

/**
 * Created by cghislai on 5/22/17.
 */

export interface Service {
  createdAt: moment.Moment;
  endPoint: EndPointJson;
  id: string;
  spec: ServiceSpec;
  previousSpec: ServiceSpec;
  updateStatus: { State: string, StartedAt: string };
  updatedAt: moment.Moment;
  version: any;
}
