export interface ContainerRemoveOptions {
  /**
   * Remove volumes as well
   */
  v: boolean;
  force: boolean;
  link: boolean;
}
