import {ColumnData} from '../../domain/column-data';

export enum NetworkColumn {
  ID,
  NAME,
  DRIVER,
  CREATED,
  GATEWAY,
  ENABLE_IPV6,
  CONTAINERS,
  CONTAINERS_AMOUNT,
  IPAM_DRIVER,
  SCOPE,
  INTERNAL,
  ATTACHABLE,
  INGRESS
}

export const NETWORK_COLUMNS: NetworkColumn[] = [
  NetworkColumn.ID,
  NetworkColumn.NAME,
  NetworkColumn.DRIVER,
  NetworkColumn.CREATED,
  NetworkColumn.ENABLE_IPV6,
  NetworkColumn.CONTAINERS,
  NetworkColumn.CONTAINERS_AMOUNT,
  NetworkColumn.IPAM_DRIVER,
  NetworkColumn.SCOPE,
  NetworkColumn.INTERNAL,
  NetworkColumn.ATTACHABLE,
  NetworkColumn.INGRESS,
  NetworkColumn.GATEWAY,
];

export const NETWORK_COLUMN_DATA: { [column: number]: ColumnData } = {};
NETWORK_COLUMN_DATA[NetworkColumn.ID] = {
  label: {'en': 'Id'},
  field: 'Id',
};
NETWORK_COLUMN_DATA[NetworkColumn.NAME] = {
  label: {'en': 'Name'},
  field: 'Name',
};
NETWORK_COLUMN_DATA[NetworkColumn.DRIVER] = {
  label: {'en': 'Driver'},
  field: 'Driver',
};
NETWORK_COLUMN_DATA[NetworkColumn.CREATED] = {
  label: {'en': 'Created'},
  field: 'Created',
};
NETWORK_COLUMN_DATA[NetworkColumn.ENABLE_IPV6] = {
  label: {'en': 'IPv6'},
  field: 'EnableIPv6',
};
NETWORK_COLUMN_DATA[NetworkColumn.CONTAINERS] = {
  label: {'en': 'Containers'},
  field: 'Containers',
};
NETWORK_COLUMN_DATA[NetworkColumn.CONTAINERS_AMOUNT] = {
  label: {'en': 'Container amount'},
  field: '-',
};
NETWORK_COLUMN_DATA[NetworkColumn.IPAM_DRIVER] = {
  label: {'en': 'IPAM Driver'},
  field: 'IPAM.Driver',
};
NETWORK_COLUMN_DATA[NetworkColumn.SCOPE] = {
  label: {'en': 'Scope'},
  field: 'Scope',
};
NETWORK_COLUMN_DATA[NetworkColumn.INTERNAL] = {
  label: {'en': 'Internal'},
  field: 'Internal',
};
NETWORK_COLUMN_DATA[NetworkColumn.ATTACHABLE] = {
  label: {'en': 'Attachable'},
  field: 'Attachable',
};
NETWORK_COLUMN_DATA[NetworkColumn.INGRESS] = {
  label: {'en': 'Ingress'},
  field: 'Ingress',
};
NETWORK_COLUMN_DATA[NetworkColumn.GATEWAY] = {
  label: {'en': 'Gateway'},
  field: 'Gateway',
};



