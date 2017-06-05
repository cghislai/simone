import {NodeSpec} from './node-spec';
import {NodeDescription} from './node-description';

export interface Node {
  ID: string;
  Version: { Index: number };
  CreatedAt: string ;
  UpdatedAt: string ;
  Spec: NodeSpec;
  Description: NodeDescription;
  ManagerStatus?:{
    Addr: string;
    Leader: boolean;
    Reachability: string;
  };
  Status?: {
    Addr: string;
    State: string
  };
}
