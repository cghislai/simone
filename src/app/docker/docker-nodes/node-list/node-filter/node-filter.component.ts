import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NodeFilter} from '../../../client/domain/node-filter';

@Component({
  selector: 'app-node-filter',
  templateUrl: './node-filter.component.html',
  styleUrls: ['./node-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NodeFilterComponent,
      multi: true,
    },
  ],
})

export class NodeFilterComponent implements OnInit, ControlValueAccessor {


  ids: string[] = [];
  labels: string[] = [];
  names: string[] = [];
  memberships: ('accepted' | 'pending')[] = ['accepted'];
  roles: ('worker' | 'manager')[] = [];

  membershipOptions: SelectItem[] = [];
  rolesOptions: SelectItem[] = [];

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor() {
  }

  ngOnInit() {
    this.initOptions();
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


  onNamesChange(names: string[]) {
    this.names = names;
    this.onTouchedFunction();
    this.fireFilter();
  }


  onIdsChange(ids: string[]) {
    this.ids = ids;
    this.onTouchedFunction();
    this.fireFilter();
  }


  onRoleChange(roles: ('worker' | 'manager')[]) {
    this.roles = roles;
    this.onTouchedFunction();
    this.fireFilter();
  }


  onLabelsChange(labels: string[]) {
    this.labels = labels;
    this.onTouchedFunction();
    this.fireFilter();
  }

  onMemebershipsChange(memeberships: ('accepted' | 'pending')[]) {
    this.memberships = memeberships;
    this.onTouchedFunction();
    this.fireFilter();
  }

  private setFilter(filter: NodeFilter) {
    if (filter == null) {
      this.names = [];
      this.ids = [];
      this.labels = [];
      this.roles = [];
      this.memberships = [];
      return;
    }

    this.names = filter.name;
    this.ids = filter.id;
    this.labels = filter.label;
    this.roles = filter.role;
    this.memberships = filter.membership;
  }

  private fireFilter() {
    let filter: NodeFilter = {
      name: this.names,
      id: this.ids,
      label: this.labels,
      role: this.roles,
      membership: this.memberships,
    };
    this.onChangeFunction(filter);
  }


  private initOptions() {
    this.membershipOptions = [
      {
        label: 'Accepted',
        value: 'accepted',
      }, {
        label: 'Pending',
        value: 'pending',
      },
    ];
    this.rolesOptions = [
      {
        label: 'Manager',
        value: 'manager',
      }, {
        label: 'Worker',
        value: 'worker',
      },
    ];
  }
}
