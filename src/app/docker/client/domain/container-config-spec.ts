/**
 * Created by cghislai on 5/22/17.
 */

export interface ContainerConfigSpec {
  File?: { Name: string, UID?: string, GID?: string, Mode?: number };
  ConfigName: string;
  ConfigID?: string;
}
