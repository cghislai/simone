/**
 * Specification for the restart policy which applies to containers created as part of this service.
 */
export interface RestartPolicyJson {
  Condition?: 'none' | 'on-failure' | 'any',
  /** Delay between restart attempts.**/
  Delay?: number,
  /** Maximum attempts to restart a given container before giving up (default value is 0, which is ignored). **/
  MaxAttempts: number,
  /** Windows is the time window used to evaluate the restart policy (default value is 0, which is unbounded). **/
  Window?: number
}
