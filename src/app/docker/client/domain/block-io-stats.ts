export interface BlockIoStats {
  blkio_stats: {
    io_service_bytes_recursive: {
      major: number;
      minor: number;
      op: string;
      value: number;
    }[];
    io_serviced_recursive: {
      major: number;
      minor: number;
      op: string;
      value: number;
    }[];
    io_queue_recursive: {
      major: number;
      minor: number;
      op: string;
      value: number;
    }[];
    io_service_time_recursive: {
      major: number;
      minor: number;
      op: string;
      value: number;
    }[];
    io_wait_time_recursive: {
      major: number;
      minor: number;
      op: string;
      value: number;
    }[];
    io_merged_recursive: {
      major: number;
      minor: number;
      op: string;
      value: number;
    }[];
    io_time_recursive: {
      major: number;
      minor: number;
      op: string;
      value: number;
    }[];
    sectors_recursive: {
      major: number;
      minor: number;
      op: string;
      value: number;
    }[];
  }
}
