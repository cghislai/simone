import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TaskFilter} from '../../../client/domain/task-filter';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TaskFilterComponent,
    multi: true,
  }],
})
export class TaskFilterComponent implements OnInit, ControlValueAccessor {

  ids: string[] = [];
  names: string[] = [];
  labels: string[] = [];
  desiredStates: string[] = [];
  nodes: string[] = [];
  services: string[] = [];

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor() {
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.setFilter(obj);
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  onIdChange(ids: string[]) {
    this.ids = ids;
    this.onTouchedFunction();
    this.fireFilter();
  }

  onNamesChange(names: string[]) {
    this.names = names;
    this.onTouchedFunction();
    this.fireFilter();
  }

  onLabelsChange(labels: string[]) {
    this.labels = labels;
    this.onTouchedFunction();
    this.fireFilter();
  }


  onNodesChange(ndoes: string[]) {
    this.nodes = ndoes;
    this.onTouchedFunction();
    this.fireFilter();
  }

  onServicesChange(services: string[]) {
    this.services = services;
    this.onTouchedFunction();
    this.fireFilter();
  }

  onStatesChanged(states: string[]) {
    this.desiredStates = states;
    this.onTouchedFunction();
    this.fireFilter();
  }

  private setFilter(filter: TaskFilter) {
    if (filter == null) {
      this.ids = [];
      this.names = [];
      this.labels = [];
      this.desiredStates = [];
      this.nodes = [];
      this.services = [];
      return;
    }

    this.ids = filter.id;
    this.names = filter.name;
    this.labels = filter.label;
    this.desiredStates = filter.desiredState;
    this.nodes = filter.node;
    this.services = filter.service;
  }

  private fireFilter() {
    let filter: TaskFilter = {
      id: this.ids,
      name: this.names,
      label: this.labels,
      desiredState: this.desiredStates,
      node: this.nodes,
      service: this.services,
    };
    this.onChangeFunction(filter);
  }
}
