/**
 * Created by cghislai on 3/26/17.
 */

export interface SimoneDockerOptions {
  label: string;

  mode: 'tcp' | 'socket';
  url: string;
  socketPath: string;

  version?: string,

  timeout?: number,
  heartbeatDelay: number,
}
