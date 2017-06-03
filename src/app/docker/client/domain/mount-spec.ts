export interface MountSpec {
  'Type': 'volume' | 'bind',
  'Source': string,
  'Target': string,
  'VolumeOptions'?: {
    'Labels'?: { [key: string]: string }
  }
}
