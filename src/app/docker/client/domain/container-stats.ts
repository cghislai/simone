import {NetworkStats} from './network-stats';
import {MemoryStats} from './memory-stats';
import {CpuStats} from './cpu-stats';
import {BlockIoStats} from './block-io-stats';

export interface ContainerStats {
  read: string;
  preread: string;
  'pids_stats': {
    'current'?: number
  };
  'blkio_stats': BlockIoStats,
  'num_procs': number,
  'storage_stats': {},
  'cpu_stats': CpuStats,
  'precpu_stats': CpuStats
  'memory_stats'?: MemoryStats,
  name: string,
  id: string,
  'networks': { [key: string]: NetworkStats },
}
