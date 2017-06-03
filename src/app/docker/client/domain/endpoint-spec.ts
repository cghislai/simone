import {PortBinding} from './port-binding';

export interface EndpointSpec {
  Mode: string,
  Ports?: PortBinding[]
}
