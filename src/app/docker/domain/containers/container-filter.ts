export interface ContainerFilter {
  includeStopped?: boolean;
  includeSizes?: boolean;
  limit?: number;
  filters: {
    ancestor?: string[];
    before?: string[];
    exited?: number[];
    health?: ('starting' | 'healthy' | 'unhealthy' | 'none')[];
    id: string[];
    isolation?: string[];
    isTask: boolean[];
    label: string[];
    name: string[];
    network?: string[];
    since?: string[];
    status?: string[];
    volume?: string[];
  }
}
export const EMPTY_CONTAINER_FILTER : ContainerFilter = {
  filters: {
    id: [],
    label: [],
    name: [],
    isTask: []
  }
};
