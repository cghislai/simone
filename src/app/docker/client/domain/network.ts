import {NetworkContainer} from './network-container';
import {Ipam} from './ipam';

export interface Network {
  Driver: string;
  Created: string;
  EnableIPv6: boolean;
  Name: string;
  Containers: { [containerId: string]: NetworkContainer };
  IPAM: Ipam;
  Ingress: boolean;
  Scope: string;
  Id: string;
  Internal: boolean;
  Options: { [key: string]: string };
  Labels: { [key: string]: string };
  Attachable: boolean;
}
