import {SecretSpecJson} from './secret-spec';
import {MountSpec} from './mount-spec';

/**
 * Created by cghislai on 5/22/17.
 */


export class ContainerSpecJson {
  Image: string;
  Labels: { [key: string]: string };
  Args: string[];
  Env: string[];
  Mounts: MountSpec[];
  Secrets: SecretSpecJson[];
}
