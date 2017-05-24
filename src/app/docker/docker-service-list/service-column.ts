export enum ServiceColumn {
  ID,
  NAME,
  MODE,
  REPLCICAS,
  CREATED_AT,
  UPDATED_AT,
  IMAGE
}

export const SERVICE_COLUMN_LABELS = {en: {}};
SERVICE_COLUMN_LABELS.en[ServiceColumn.REPLCICAS] = 'Replicas';
SERVICE_COLUMN_LABELS.en[ServiceColumn.MODE] = 'Mode';
SERVICE_COLUMN_LABELS.en[ServiceColumn.IMAGE] = 'Image';
SERVICE_COLUMN_LABELS.en[ServiceColumn.NAME] = 'Name';
SERVICE_COLUMN_LABELS.en[ServiceColumn.CREATED_AT] = 'Created';
SERVICE_COLUMN_LABELS.en[ServiceColumn.UPDATED_AT] = 'Updated';
SERVICE_COLUMN_LABELS.en[ServiceColumn.ID] = 'Id';

export const SERVICE_COLUMNS = [
  ServiceColumn.ID,
  ServiceColumn.NAME,
  ServiceColumn.IMAGE,
  ServiceColumn.MODE,
  ServiceColumn.REPLCICAS,
  ServiceColumn.CREATED_AT,
  ServiceColumn.UPDATED_AT,
];
