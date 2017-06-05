export interface NodeSpec {
  Name: string;
  Labels: { [key: string]: string };
  Role: 'worker' | 'manager';
  Availability: 'active' | 'pause' | 'drain';
}
