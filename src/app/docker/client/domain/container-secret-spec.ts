/**
 * Created by cghislai on 5/22/17.
 */

export interface ContainerSecretSpec {
  File?: { Name: string, UID?: string, GID?: string, Mode?: number };
  SecretName: string;
  SecretID?: string;
}
