import {ColumnData} from '../../domain/column-data';

export enum ConfigColumn {
  ID,
  NAME,
  CREATED_AT,
  UPDATED_AT
}

export const CONFIG_COLUMNS = [
  ConfigColumn.ID,
  ConfigColumn.NAME,
  ConfigColumn.CREATED_AT,
  ConfigColumn.UPDATED_AT,
];

export const CONFIG_COLUMN_DATA: { [column: number]: ColumnData } = {};
CONFIG_COLUMN_DATA[ConfigColumn.ID] = {
  label: {'en': 'Id'},
  field: 'ID',
};
CONFIG_COLUMN_DATA[ConfigColumn.NAME] = {
  label: {'en': 'Name'},
  field: 'Spec.Name',
};
CONFIG_COLUMN_DATA[ConfigColumn.CREATED_AT] = {
  label: {'en': 'Created'},
  field: 'CreatedAt',
};
CONFIG_COLUMN_DATA[ConfigColumn.UPDATED_AT] = {
  label: {'en': 'Updated'},
  field: 'UpdatedAt',
};


