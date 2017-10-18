import {ContainerSecretSpec} from './container-secret-spec';
import {MountSpec} from './mount-spec';
import {HealthConfig} from './health-config';
import {ContainerConfigSpec} from './container-config-spec';

/**
 * Created by cghislai on 5/22/17.
 */


export class ContainerSpecJson {
  Image: string;
  Labels: { [key: string]: string };
  Args: string[];
  Env: string[];
  Mounts: MountSpec[];
  Secrets: ContainerSecretSpec[];
  Configs: ContainerConfigSpec[];

  Dir: string;
  User: string;
  Groups: string[];

  Tty: boolean;
  OpenStdin: boolean;
  ReadOnly: boolean;

  StopSignal: string;
  StopGracePeriod: number;
  Healthcheck?: HealthConfig;

  Hosts: string[];
  DNSConfig: any;
}
