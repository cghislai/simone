import {EndPointJson} from './endpoint';
import {ServiceSpecJson} from './service-spec';
import {ServiceUpdateStatus} from './service-update-status';

/**
 * Created by cghislai on 5/22/17.
 */

export interface ServiceJson {
  ID: string;
  Version: { Index?: number };
  CreatedAt: string;
  UpdatedAt: string;
  Spec: ServiceSpecJson;
  PreviousSpec?: ServiceSpecJson;
  Endpoint: EndPointJson;
  UpdateStatus?: ServiceUpdateStatus;
}
