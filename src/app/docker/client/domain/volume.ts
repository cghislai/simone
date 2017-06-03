export interface Volume {
  'Driver': string,
  'Labels': { [key: string]: string };
  'Mountpoint': string;
  'Status'?: any;
  'Name': string;
  'Options': any,
  'Scope': string;
}
