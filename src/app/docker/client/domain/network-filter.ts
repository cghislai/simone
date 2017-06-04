export interface NetworkFilter {
  driver: string[],
  id: string[],
  label: string[],
  name: string[],
  type: ('custom' | 'builtin')[]
}
