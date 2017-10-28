export interface LogFilter {
  stdIn?: boolean;
  stdOut?: boolean;
  stdErr?: boolean;
  details?: boolean;
  follow?: boolean;
  since?: number;
  timestamps?: boolean;
  tail: string;

}
