export interface SwarmInfo {
  Cluster: {
    CreatedAt: string;
    ID: string;
    Spec: any;
    UpdatedAt: string;
    Version: any;
  };
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
