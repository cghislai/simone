export interface Ipam {
  Driver: string;
  Config: { 'Subnet': string, 'IPRange': string, 'Gateway': string, 'AuxAddress': string };
  Options: {[key:string]:string};
}
