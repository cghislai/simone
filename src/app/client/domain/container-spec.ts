import {SecretSpecJson} from './secret-spec';

/**
 * Created by cghislai on 5/22/17.
 */


export class ContainerSpecJson {
  Args: string[];
  Env: string[];
  Image: string;
  Labels: { [key: string]: string }
  Mounts: { Type: string, Source: string, Target: string }[];
  Secrets: SecretSpecJson[];
}
