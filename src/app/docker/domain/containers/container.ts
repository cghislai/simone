import {NetworkSettings} from './network-settings';
import {MountSettings} from './mount-settings';

export interface Container {
  id: string;
  names: string[];
  image: string;
  imageId: string;
  command: string;
  created: number;
  state: string;
  status: string;
  ports: { 'PrivatePort': number; 'PublicPort': number; 'Type': string }[];
  labels: { [key: string]: string };
  sizeRw: number;
  sizeRootFs: number;
  hostConfig: { 'NetworkMode': string };
  networkSettings: {
    'networks': { [key: string]: NetworkSettings }
  };
  'mounts': MountSettings[];
}
