export interface Volume {
  'Driver': string,
  'Labels': { [key: string]: string };
  'Mountpoint': string;
  'Name': string;
  'Options': any,
  'Scope': string;
}
