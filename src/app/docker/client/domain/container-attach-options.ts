export interface ContainerAttachOptions {
  stream: boolean;
  detachKeys: string;
  logs: boolean;
  stdin: boolean;
  stdout: boolean;
  stderr: boolean;
  tail: number;
}
