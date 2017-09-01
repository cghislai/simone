export interface LogFilter {
  stdIn: boolean;
  stdOut: boolean;
  stdErr: boolean;
  tail: number;
}
