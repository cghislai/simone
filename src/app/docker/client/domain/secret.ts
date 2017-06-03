import {SecretSpec} from './secret-spec';

export interface Secret {
  ID: string,
  Version: { Index: number },
  CreatedAt: string;
  UpdatedAt: string;
  Spec: SecretSpec;
}
