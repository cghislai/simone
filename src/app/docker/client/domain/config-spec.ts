export interface ConfigSpec {
  Name: string;
  Labels: { [key: string]: string }[]
  Data: string;
}
