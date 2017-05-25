import {Component, Input, OnInit} from '@angular/core';
import {TASK_COLUMN_DATA, TaskColumn} from '../taskColumn';
import {Task} from '../../../domain/tasks/task';
import {ColumnData} from '../../../domain/column-data';

@Component({
  selector: 'app-docker-task-column',
  templateUrl: './docker-task-column.component.html',
  styleUrls: ['./docker-task-column.component.scss'],
})
export class DockerTaskColumnComponent implements OnInit {


  @Input()
  column: TaskColumn;
  @Input()
  task: Task;

  taskColumn = TaskColumn;
  columnData: ColumnData;

  constructor() {
  }

  ngOnInit() {
    this.columnData = TASK_COLUMN_DATA[this.column];
  }

}
