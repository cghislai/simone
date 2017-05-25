/**
 * Created by cghislai on 3/26/17.
 */

export interface SimoneDockerOptions {
  host: string,
  port: number,
  ca?: string,
  cert?: string,
  key?: string,
  version?: string,
  protocol?: 'http' | 'https',
  timeout?: number,
  heartbeatDelay: number,
  socketPath?: string,
}
