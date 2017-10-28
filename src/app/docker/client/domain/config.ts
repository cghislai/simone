import {Version} from './version';
import {ConfigSpec} from './config-spec';

export interface Config {
  ID: string;
  Version: Version;
  CreatedAt: string;
  UpdatedAt: string;
  Spec: ConfigSpec;
}
