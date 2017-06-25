import {SwarmInfo} from './swarm-info';

export interface Info {
  Architecture: string;
  BridgeNfIp6tables: string;
  BridgeNfIptables: string;
  CPUSet: boolean;
  CPUShares: boolean;
  CgroupDriver: string;
  ClusterAdvertise: string;
  ClusterStore: string;
  ContainerdCommit: {
    Expected: string;
    ID: string;
  };
  Containers: number;
  ContainersPaused: number;
  ContainersRunning: number;
  ContainersStopped: number;
  CpuCfsPeriod: boolean;
  CpuCfsQuota: boolean;
  Debug: boolean;
  DefaultRuntime: string;
  DockerRootDir: string;
  Driver: string;
  DriverStatus: string[][];
  ExperimentalBuild: boolean;
  HttpProxy: string;
  HttpsProxy: string;
  ID: string;
  IPv4Forwarding: boolean;
  Images: number;
  IndexServerAddress: string;
  InitBinary: string;
  InitCommit: {
    Expected: string;
    ID: string;
  };
  Isolation: string;
  KernelMemory: boolean;
  KernelVersion: string;
  Labels: any;
  LiveRestoreEnabled: boolean;
  LoggingDriver: string;
  MemTotal: number;
  MemoryLimit: boolean;
  NCPU: number;
  NEventsListener: number;
  NFd: number;
  NGoroutines: number;
  Name: string;
  NoProxy: string;
  OSType: string;
  OomKillDisable: boolean;
  OperatingSystem: string;
  Plugins: {
    Authorization: string[];
    Network: string[];
    Volume: string[]
  };
  RegistryConfig: any;
  RuncCommit: {
    Expected: string;
    ID: string;
  };
  Runtimes: any;
  SecurityOptions: any[];
  ServerVersion: string;
  SwapLimit: boolean;
  Swarm: SwarmInfo;
  SystemStatus: any;
  SystemTime: string;
}
