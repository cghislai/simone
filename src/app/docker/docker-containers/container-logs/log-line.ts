export enum Stream {
  IN,
  OUT,
  ERR
}

export const STREAM = {
  'in': Stream.IN,
  'out': Stream.OUT,
  'err': Stream.ERR
};

export interface LogLine {
  stream: Stream;
  data: string;
}
