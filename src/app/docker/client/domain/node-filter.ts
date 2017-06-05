export interface NodeFilter {
  id: string[];
  label: string[];
  membership: ('accepted' | 'pending')[];
  name: string[];
  role: ('manager' | 'worker')[];
}
