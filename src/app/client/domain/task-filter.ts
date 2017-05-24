/**
 * Created by cghislai on 5/23/17.
 */

export interface TaskFilter {
  filters: {[key:string]:string[]}
}

export interface TaskFilterJson {
  filters: string;
}

/*
  'desired-state'?: 'running' | 'shutdown' | 'accepted';
  'id'?: string;
  'label'?: string;
  'name'?: string;
  'node'?: string;
  'service'?: string;
 */
