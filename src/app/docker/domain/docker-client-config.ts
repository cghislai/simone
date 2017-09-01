/**
 * Created by cghislai on 3/26/17.
 */
import {DockerServerInfo} from './docker-server-info';

export interface DockerClientConfig {

  api: {
    endPointUrl: string;
    version: string;
  }

  serverInfo: DockerServerInfo;

  label: string;
  heartbeatDelay: number,
}
