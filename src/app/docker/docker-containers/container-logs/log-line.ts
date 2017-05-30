export enum Stream {
  IN,
  OUT,
  ERR
}

export interface LogLine {
  stream: Stream;
  data: string;
}
