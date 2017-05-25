import {ColumnData} from '../../domain/column-data';

export enum ServiceColumn {
  ID,
  NAME,
  MODE,
  REPLICAS,
  CREATED_AT,
  UPDATED_AT,
  IMAGE
}


export const SERVICES_COLUMN_DATA: { [key: number]: ColumnData } = {};
SERVICES_COLUMN_DATA[ServiceColumn.ID] = {
  label: {'en': 'Id'},
  field: 'id',
};
SERVICES_COLUMN_DATA[ServiceColumn.NAME] = {
  label: {'en': 'Name'},
  field: 'spec.name',
};
SERVICES_COLUMN_DATA[ServiceColumn.MODE] = {
  label: {'en': 'Mode'},
  field: 'spec.mode.mode',
};
SERVICES_COLUMN_DATA[ServiceColumn.REPLICAS] = {
  label: {'en': 'Replicas'},
  field: 'spec.mode.replicas',
};
SERVICES_COLUMN_DATA[ServiceColumn.UPDATED_AT] = {
  label: {'en': 'Updated'},
  field: 'updatedAt',
};
SERVICES_COLUMN_DATA[ServiceColumn.CREATED_AT] = {
  label: {'en': 'Created'},
  field: 'createdAt',
};
SERVICES_COLUMN_DATA[ServiceColumn.IMAGE] = {
  label: {'en': 'Image'},
  field: 'spec.taskTemplate.ContainerSpec.Image',
};


export const SERVICE_COLUMNS = [
  ServiceColumn.ID,
  ServiceColumn.NAME,
  ServiceColumn.IMAGE,
  ServiceColumn.MODE,
  ServiceColumn.REPLICAS,
  ServiceColumn.CREATED_AT,
  ServiceColumn.UPDATED_AT,
];
