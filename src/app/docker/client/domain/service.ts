import {EndPointJson} from './endpoint';
import {ServiceSpecJson} from './service-spec';

/**
 * Created by cghislai on 5/22/17.
 */

export interface ServiceJson {
  CreatedAt: string;
  Endpoint: EndPointJson;
  ID: string;
  PreviousSpec?: ServiceSpecJson;
  Spec: ServiceSpecJson;
  UpdateStatus: { State: string, StartedAt: string }
  UpdatedAt: string;
  Version: { Index?: 228378 };
}
