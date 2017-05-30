export interface CpuStats {
  'cpu_usage': {
    'percpu_usage': number[],
    'usage_in_usermode': number,
    'total_usage': number,
    'usage_in_kernelmode': number
  },
  'system_cpu_usage': number,
  'online_cpus': number,
  'throttling_data': {
    'periods': number,
    'throttled_periods': number,
    'throttled_time': number
  }
}
