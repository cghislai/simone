import {NetworkSettingsJson} from './network-settings';
import {MountSettingsJson} from './mount-settings';

export interface ContainerJson {
  'Id': string,
  'Names': string[],
  'Image': string,
  'ImageID': string,
  'Command': string,
  'Created': number,
  'State': string,
  'Status': string,
  'Ports': { 'PrivatePort': number, 'PublicPort': number, 'Type': string }[],
  'Labels': { [key: string]: string },
  'SizeRw': number,
  'SizeRootFs': number,
  'HostConfig': { 'NetworkMode': string },
  'NetworkSettings': {
    'Networks': { [key: string]: NetworkSettingsJson }
  };
  'Mounts': MountSettingsJson[];
}
