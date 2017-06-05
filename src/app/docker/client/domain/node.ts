import {NodeSpec} from './node-spec';
import {NodeDescription} from './node-description';
import {Version} from './version';

export interface Node {
  ID: string;
  Version: Version;
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
