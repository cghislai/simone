export interface TaskFilter {
  id: string[];
  label: string[];
  name: string[];
  node: string[];
  service: string[];
  desiredState: ('running' | 'shutdown' | 'accepted')[]
}
