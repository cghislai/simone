import {NetworkConfig} from './network-config';
import {MountSettingsJson} from './mount-settings';
import {HostConfig} from 'dockerode';
import {HealthStatus} from './health-status';

<<<<<<< HEAD
import {HealthConfig} from './health-config';

======
=
>>>>>>>
90
ae2cfb3f77811365ab0177e14caab072673767

export interface ContainerInspectInfo {
  Id: string;
  Created: string;
  Path: string;
  Args: string[];
  State: {
    Status: string;
    Running: boolean;
    Paused: boolean;
    Restarting: boolean;
    OOMKilled: boolean;
    Dead: boolean;
    Pid: number;
    ExitCode: number;
    Error: string;
    StartedAt: string;
    FinishedAt: string;
    Health?: HealthStatus;
  };
  Image: string;
  ResolvConfPath: string;
  HostnamePath: string;
  HostsPath: string;
  LogPath: string;
  Name: string;
  RestartCount: number;
  Driver: string;
  MountLabel: string;
  ProcessLabel: string;
  AppArmorProfile: string;
  ExecIDs?: any;
  HostConfig: HostConfig;
  GraphDriver: {
    Name: string;
    Data: {
      DeviceId: string;
      DeviceName: string;
      DeviceSize: string;
    }
  };
  Mounts: MountSettingsJson[];
  Config: {
    Hostname: string;
    Domainname: string;
    User: string;
    AttachStdin: boolean;
    AttachStdout: boolean;
    AttachStderr: boolean;
    ExposedPorts: { [portAndProtocol: string]: {} };
    <<<<<<< HEAD
    Healthcheck?: HealthConfig;
    =======
    >>>>>>> 90ae2cfb3f77811365ab0177e14caab072673767
    Tty: boolean;
    OpenStdin: boolean;
    StdinOnce: boolean;
    Env: string[];
    Cmd: string[];
    Image: string;
    Volumes: { [volume: string]: {} };
    WorkingDir: string;
    Entrypoint?: any;
    OnBuild?: any;
    Labels: { [label: string]: string }
  };
  NetworkSettings: {
    Bridge: string;
    SandboxID: string;
    HairpinMode: boolean;
    LinkLocalIPv6Address: string;
    LinkLocalIPv6PrefixLen: number;
    Ports: {
      [portAndProtocol: string]: {
        HostIp: string;
        HostPort: string;
      }
    };
    SandboxKey: string;
    SecondaryIPAddresses?: any;
    SecondaryIPv6Addresses?: any;
    EndpointID: string;
    Gateway: string;
    GlobalIPv6Address: string;
    GlobalIPv6PrefixLen: number;
    IPAddress: string;
    IPPrefixLen: number;
    IPv6Gateway: string;
    MacAddress: string;
    Networks: {
      [type: string]: NetworkConfig;
    }
  };
}
