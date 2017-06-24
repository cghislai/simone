import {ColumnData} from '../../domain/column-data';

export enum ServiceColumn {
  ID,
  NAME,
  MODE,
  REPLICAS,
  CREATED_AT,
  UPDATED_AT,
  IMAGE,
  PORTS,
  UPDATE_STATUS,
}


export const SERVICES_COLUMN_DATA: { [key: number]: ColumnData } = {};
SERVICES_COLUMN_DATA[ServiceColumn.ID] = {
  label: {'en': 'Id'},
  field: 'id',
};
SERVICES_COLUMN_DATA[ServiceColumn.NAME] = {
  label: {'en': 'Name'},
  field: 'spec.Name',
};
SERVICES_COLUMN_DATA[ServiceColumn.MODE] = {
  label: {'en': 'Mode'},
  field: 'spec.Mode.mode',
};
SERVICES_COLUMN_DATA[ServiceColumn.REPLICAS] = {
  label: {'en': 'Replicas'},
  field: 'spec.Mode.replicas',
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
  field: 'spec.TaskTemplate.ContainerSpec.Image',
};
SERVICES_COLUMN_DATA[ServiceColumn.PORTS] = {
  label: {'en': 'Ports'},
  field: 'spec.EndpointSpec',
};
SERVICES_COLUMN_DATA[ServiceColumn.UPDATE_STATUS] = {
  label: {'en': 'Update status'},
  field: 'spec.UpdateStatus.Message',
};

export const SERVICE_COLUMNS = [
  ServiceColumn.ID,
  ServiceColumn.NAME,
  ServiceColumn.IMAGE,
  ServiceColumn.MODE,
  ServiceColumn.REPLICAS,
  ServiceColumn.CREATED_AT,
  ServiceColumn.UPDATED_AT,
  ServiceColumn.PORTS,
  ServiceColumn.UPDATE_STATUS,
];
