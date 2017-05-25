export interface MountSettings {
  name: string;
  source: string;
  destination: string;
  driver: string;
  mode: string;
  rw: boolean;
  propagation: string;
}
