/**
 * Created by cghislai on 5/22/17.
 */

export interface SecretSpecJson {
  File: {Name: string, UID:string, GID:string, Mode: number};
  SecretID: string;
  SecretName: string;
}
