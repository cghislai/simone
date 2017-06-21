/**
 * Specification for the update strategy of the service.
 */
export interface ServiceUpdateConfig {
  /** Maximum number of tasks to be updated in one iteration (0 means unlimited parallelism).**/
  Parallelism?: number,
  /** Amount of time between updates, in nanoseconds. **/
  Delay?: number,
  FailureAction: 'continue' | 'pause' | 'rollback',
  /**  Amount of time to monitor each updated task for failures, in nanoseconds.**/
  Monitor?: number,
  /** The fraction of tasks that may fail during an update before the failure action is invoked, specified as a floating point number between 0 and 1. **/
  MaxFailureRatio?: number,
  /**
   * The order of operations when rolling out an updated task. Either the old task is shut down before the new task is started, or the new task is started before the old task is shut down.
   */
  Order: 'stop-first' | 'start-first'
}
