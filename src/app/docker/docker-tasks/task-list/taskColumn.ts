import {ColumnData} from '../../domain/column-data';

export enum TaskColumn {
  ID,
  SERVICE,
  SLOT,
  CREATED_AT,
  UPDATED_AT,
  NODE,
  DESIRED_STATE,
  STATE,
  MESSAGE,
  CONTAINER,
  IMAGE
}


export const TASK_COLUMNS = [
  TaskColumn.ID,
  TaskColumn.SERVICE,
  TaskColumn.IMAGE,
  TaskColumn.CONTAINER,
  TaskColumn.NODE,
  TaskColumn.DESIRED_STATE,
  TaskColumn.STATE,
  TaskColumn.CREATED_AT,
  TaskColumn.UPDATED_AT,
  TaskColumn.MESSAGE,
];

export const TASK_COLUMN_DATA: { [key: number]: ColumnData } = {};
TASK_COLUMN_DATA[TaskColumn.ID] = {
  label: {'en': 'Id'},
  field: 'id',
};
TASK_COLUMN_DATA[TaskColumn.SERVICE] = {
  label: {'en': 'Service'},
  field: 'serviceName',
};
TASK_COLUMN_DATA[TaskColumn.SLOT] = {
  label: {'en': 'Slot'},
  field: 'slot',
};
TASK_COLUMN_DATA[TaskColumn.UPDATED_AT] = {
  label: {'en': 'Updated'},
  field: 'updatedAt',
};
TASK_COLUMN_DATA[TaskColumn.CREATED_AT] = {
  label: {'en': 'Created'},
  field: 'createdAt',
};
TASK_COLUMN_DATA[TaskColumn.IMAGE] = {
  label: {'en': 'Image'},
  field: 'spec.ContainerSpec.Image',
};
TASK_COLUMN_DATA[TaskColumn.CONTAINER] = {
  label: {'en': 'Container'},
  field: 'status.ContainerStatus.ContainerID',
};
TASK_COLUMN_DATA[TaskColumn.NODE] = {
  label: {'en': 'Node'},
  field: 'nodeName',
};
TASK_COLUMN_DATA[TaskColumn.DESIRED_STATE] = {
  label: {'en': 'Desired state'},
  field: 'desiredState',
};
TASK_COLUMN_DATA[TaskColumn.STATE] = {
  label: {'en': 'State'},
  field: 'status.State',
};
TASK_COLUMN_DATA[TaskColumn.MESSAGE] = {
  label: {'en': 'Message'},
  field: 'status.Message',
};


