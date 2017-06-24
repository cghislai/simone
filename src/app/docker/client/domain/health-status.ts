export interface HealthStatus {
  FailingStreak: number;
  Log: {
    Start: string;
    End: string;
    ExitCode: number;
    Output: string;
  }[];
  Status: string;
}
