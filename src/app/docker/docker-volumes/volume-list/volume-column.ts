import {ColumnData} from '../../domain/column-data';

export enum VolumeColumn {
  NAME,
  DRIVER,
  OPTIONS,
  SCOPE
}

export const VOLUME_COLUMNS: VolumeColumn[] = [
  VolumeColumn.NAME,
  VolumeColumn.DRIVER,
  VolumeColumn.OPTIONS,
  VolumeColumn.SCOPE,
];

export const VOLUME_COLUMN_DATA: { [key: number]: ColumnData } = {};
VOLUME_COLUMN_DATA[VolumeColumn.NAME] = {
  label: {'en': 'Name'},
  field: 'Name',
};
VOLUME_COLUMN_DATA[VolumeColumn.DRIVER] = {
  label: {'en': 'Driver'},
  field: 'Driver',
};
VOLUME_COLUMN_DATA[VolumeColumn.OPTIONS] = {
  label: {'en': 'Options'},
  field: 'Options',
};
VOLUME_COLUMN_DATA[VolumeColumn.SCOPE] = {
  label: {'en': 'Scope'},
  field: 'Scope',
};
