export interface NodeSpec {
  Labels: { [key: string]: string };
  Role: 'worker' | 'manager';
  Availability: 'active' | 'pause' | 'drain';
}
