/**
 * Created by cghislai on 3/26/17.
 */

export interface DockerServerInfo {

  name: string;
  debug: boolean;
  swarm: boolean;
  swarmControl: boolean;
  swarmClusterId: string;
  swarmNodeId: string;

}
