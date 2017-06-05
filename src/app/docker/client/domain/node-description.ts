export interface NodeDescription {
  Hostname: string
  Platform: {
    Architecture: string,
    OS: string
  };
  Resources: {
    NanoCPUs: number,
    MemoryBytes: number
  }
  Engine: {
    EngineVersion: string;
    Labels: { [key: string]: string };
    Plugins: {
      Type: string;
      Name: string;
    }[];
  }
}
