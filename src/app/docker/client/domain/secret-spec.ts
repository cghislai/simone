export interface SecretSpec {
  Name: string
  Labels: { [key: string]: string };
  Data: string[];
}
