import {Component, Input, OnInit} from '@angular/core';
import {TaskTemplateJson} from '../../../client/domain/task-template';

@Component({
  selector: 'app-task-template',
  templateUrl: './task-template.component.html',
  styleUrls: ['./task-template.component.scss']
})
export class TaskTemplateComponent implements OnInit {

  @Input()
  template: TaskTemplateJson;

  constructor() { }

  ngOnInit() {
  }

}
