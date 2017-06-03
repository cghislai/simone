import {ColumnData} from '../../domain/column-data';

export enum SecretColumn {
  ID,
  NAME,
  CREATED_AT,
  UPDATED_AT
}

export const SECRET_COLUMNS = [
  SecretColumn.ID,
  SecretColumn.NAME,
  SecretColumn.CREATED_AT,
  SecretColumn.UPDATED_AT,
];

export const SECRET_COLUMN_DATA: { [column: number]: ColumnData } = {};
SECRET_COLUMN_DATA[SecretColumn.ID] = {
  label: {'en': 'Id'},
  field: 'ID',
};
SECRET_COLUMN_DATA[SecretColumn.NAME] = {
  label: {'en': 'Name'},
  field: 'Spec.Name',
};
SECRET_COLUMN_DATA[SecretColumn.CREATED_AT] = {
  label: {'en': 'Created'},
  field: 'CreatedAt',
};
SECRET_COLUMN_DATA[SecretColumn.UPDATED_AT] = {
  label: {'en': 'Updated'},
  field: 'UpdatedAt',
};


