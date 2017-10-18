import {MountSpec} from '../client/domain/mount-spec';
import {ContainerSecretSpec} from '../client/domain/container-secret-spec';
import {ContainerConfigSpec} from '../client/domain/container-config-spec';

export class ContainerUtils {

  /**
   * 'named-volume:path-in-container'
   * or '/absolute/path:path-in-container'
   * @param spec
   */
  static parseMountSpec(specString: string): MountSpec {
    let splitted = specString.split(':');
    let bind = splitted[0].indexOf('/') === 0;
    let spec: MountSpec = {
      Type: bind ? 'bind' : 'volume',
      Source: splitted[0],
      Target: splitted[1],
    };
    return spec;
  }

  static stringifyMountSpec(spec: MountSpec): string {
    return `${spec.Source}:${spec.Target}`;
  }

  /**
   * 'name' or 'name:/path-in-container'
   * @param spec
   */
  static parseContainerSecretSpec(specString: string): ContainerSecretSpec {
    let splitted = specString.split(':');
    let path = splitted.length > 1 ? splitted[1] : splitted[0];
    let spec: ContainerSecretSpec = {
      File: {
        Name: path,
      },
      SecretName: splitted[0],
    };
    return spec;
  }

  static parseContainerConfigSpec(specString: string): ContainerConfigSpec {
    let splitted = specString.split(':');
    let path = splitted.length > 1 ? splitted[1] : splitted[0];
    let spec: ContainerConfigSpec = {
      File: {
        Name: path,
      },
      ConfigName: splitted[0],
    };
    return spec;
  }


  static stringifyContainerSecretSpec(spec: ContainerSecretSpec): string {
    return `${spec.SecretName}:${spec.File.Name}`;
  }

  static stringifyContainerConfigSpec(spec: ContainerConfigSpec): string {
    return `${spec.ConfigName}:${spec.File.Name}`;
  }

}
