import {FilterJson} from './filter';

/**
 * Created by cghislai on 5/23/17.
 */

export interface ContainerFilterJson extends FilterJson{
  all?: boolean,
  limit?: number,
  size?: boolean
}

