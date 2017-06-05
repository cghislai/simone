import {ColumnData} from '../../domain/column-data';

export enum NodeColumn {
  ID,
  CREATED_AT,
  UPDATED_AT,
  NAME,
  ROLE,
  AVAILABILITY,
  HOSTNAME,
  PLATFORM_ARCHITECTURE,
  PLATFORM_OS,
  RESOURCES_CPU,
  RESOURCES_MEM,
  ENGINE_VERSION,
  STATUS_ADDRESS,
  STATUS_STATE
}

export const NODE_COLUMNS: NodeColumn[] = [
  NodeColumn.ID,
  NodeColumn.CREATED_AT,
  NodeColumn.UPDATED_AT,
  NodeColumn.NAME,
  NodeColumn.ROLE,
  NodeColumn.AVAILABILITY,
  NodeColumn.HOSTNAME,
  NodeColumn.PLATFORM_ARCHITECTURE,
  NodeColumn.PLATFORM_OS,
  NodeColumn.RESOURCES_CPU,
  NodeColumn.RESOURCES_MEM,
  NodeColumn.ENGINE_VERSION,
  NodeColumn.STATUS_ADDRESS,
  NodeColumn.STATUS_STATE,
];

export const NODE_COLUMN_DATA: { [column: number]: ColumnData } = {};
NODE_COLUMN_DATA[NodeColumn.ID] = {
  label: {en: 'Id'},
  field: 'ID',
};
NODE_COLUMN_DATA[NodeColumn.CREATED_AT] = {
  label: {en: 'Created'},
  field: 'CreatedAt',
};
NODE_COLUMN_DATA[NodeColumn.UPDATED_AT] = {
  label: {en: 'Updated'},
  field: 'UpdatedAt',
};
NODE_COLUMN_DATA[NodeColumn.NAME] = {
  label: {en: 'Name'},
  field: 'Spec.Name',
};
NODE_COLUMN_DATA[NodeColumn.ROLE] = {
  label: {en: 'Role'},
  field: 'Spec.Role',
};
NODE_COLUMN_DATA[NodeColumn.AVAILABILITY] = {
  label: {en: 'Availability'},
  field: 'Spec.Availability',
};
NODE_COLUMN_DATA[NodeColumn.HOSTNAME] = {
  label: {en: 'Hostname'},
  field: 'Description.Hostname',
};
NODE_COLUMN_DATA[NodeColumn.PLATFORM_ARCHITECTURE] = {
  label: {en: 'Architecture'},
  field: 'Description.Platform.Architecture',
};
NODE_COLUMN_DATA[NodeColumn.PLATFORM_OS] = {
  label: {en: 'OS'},
  field: 'Description.Platform.OS',
};
NODE_COLUMN_DATA[NodeColumn.RESOURCES_CPU] = {
  label: {en: 'CPU'},
  field: 'Description.Resources.NanoCPUs',
};
NODE_COLUMN_DATA[NodeColumn.RESOURCES_MEM] = {
  label: {en: 'Memory'},
  field: 'Description.Resources.MemoryBytes',
};

NODE_COLUMN_DATA[NodeColumn.ENGINE_VERSION] = {
  label: {en: 'Engine version'},
  field: 'Description.Engine.EngineVersion',
};

NODE_COLUMN_DATA[NodeColumn.STATUS_ADDRESS] = {
  label: {en: 'Address'},
  field: 'Status.Addr',
};

NODE_COLUMN_DATA[NodeColumn.STATUS_STATE] = {
  label: {en: 'State'},
  field: 'Status.State',
};
