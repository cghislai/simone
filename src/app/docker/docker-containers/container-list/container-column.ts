import {ColumnData} from '../../domain/column-data';

export enum ContainerColumn {
  ID,
  NAMES,
  IMAGE,
  IMAGE_ID,

  COMMAND,
  CREATED,
  STATE,
  STATUS,

  PORTS,
  LABELS,
  NETWORKS,
  MOUNTS,
}


export const CONTAINER_COLUMN_DATA: { [key: number]: ColumnData } = {};
CONTAINER_COLUMN_DATA[ContainerColumn.ID] = {
  label: {'en': 'Id'},
  field: 'id',
};
CONTAINER_COLUMN_DATA[ContainerColumn.NAMES] = {
  label: {'en': 'Names'},
  field: 'names',
};
CONTAINER_COLUMN_DATA[ContainerColumn.IMAGE] = {
  label: {'en': 'Image'},
  field: 'image',
};
CONTAINER_COLUMN_DATA[ContainerColumn.IMAGE_ID] = {
  label: {'en': 'Image ID'},
  field: 'imageID',
};
CONTAINER_COLUMN_DATA[ContainerColumn.COMMAND] = {
  label: {'en': 'Command'},
  field: 'command',
};
CONTAINER_COLUMN_DATA[ContainerColumn.CREATED] = {
  label: {'en': 'Created'},
  field: 'created',
};
CONTAINER_COLUMN_DATA[ContainerColumn.STATE] = {
  label: {'en': 'State'},
  field: 'state',
};
CONTAINER_COLUMN_DATA[ContainerColumn.STATUS] = {
  label: {'en': 'Status'},
  field: 'status',
};
CONTAINER_COLUMN_DATA[ContainerColumn.PORTS] = {
  label: {'en': 'Ports'},
  field: 'ports',
};
CONTAINER_COLUMN_DATA[ContainerColumn.LABELS] = {
  label: {'en': 'Labels'},
  field: 'labels',
};
CONTAINER_COLUMN_DATA[ContainerColumn.NETWORKS] = {
  label: {'en': 'Networks'},
  field: 'networkSettings.networks',
};
CONTAINER_COLUMN_DATA[ContainerColumn.MOUNTS] = {
  label: {'en': 'Mounts'},
  field: 'mounts',
};


export const CONTAINER_COLUMNS = [
  ContainerColumn.ID,
  ContainerColumn.NAMES,
  ContainerColumn.IMAGE,
  ContainerColumn.IMAGE_ID,
  ContainerColumn.COMMAND,
  ContainerColumn.CREATED,
  ContainerColumn.STATE,
  ContainerColumn.STATUS,
  ContainerColumn.PORTS,
  ContainerColumn.LABELS,
  ContainerColumn.NETWORKS,
  ContainerColumn.MOUNTS,
];
