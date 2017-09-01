import {CusterInfo} from './custer-info';

export interface SwarmInfo {
  Cluster: CusterInfo;
  ControlAvailable: boolean;
  Error: string;
  LocalNodeState: string;
  Managers: number;
  NodeAddr: string;
  NodeID: string;
  Nodes: number;
  RemoteManagers: {
    Addr: string;
    NodeID: string;
  }[];
}
