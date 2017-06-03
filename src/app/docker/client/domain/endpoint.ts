/**
 * Created by cghislai on 5/22/17.
 */
import {EndpointSpec} from './endpoint-spec';
import {PortBinding} from './port-binding';

export interface EndPointJson {
  Spec: EndpointSpec,
  Ports?: PortBinding[],
  VirtualIPs: { NetworkID: string, Addr: string }[]
}
