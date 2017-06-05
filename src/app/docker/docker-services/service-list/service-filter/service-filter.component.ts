import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ServiceFilter} from '../../../domain/services/service-filter';
import {SelectItem} from 'primeng/primeng';
import {DockerStacksService} from '../../../services/docker-stacks.service';

@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrls: ['./service-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ServiceFilterComponent,
    multi: true,
  }],
})
export class ServiceFilterComponent implements OnInit, OnChanges, ControlValueAccessor {


  @Input()
  private stacks: string[];

  ids: string[] = [];
  names: string[] = [];
  labels: string[] = [];
  stackOptions: SelectItem[];
  stack: string;

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor(private stackService: DockerStacksService) {
  }

  ngOnInit() {
    this.initStackOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    let stacksChange = changes['stacks'];
    if (stacksChange != null) {
      this.initStackOptions();
    }
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
    this.updateSelectedStackFromLabels(labels);
    this.fireFilter();
  }

  onStackChange(stack: string) {
    this.stack = stack;
    this.updateLabelsFromSelectedStack(stack);
    this.fireFilter();
  }

  private setFilter(filter: ServiceFilter) {
    if (filter == null) {
      this.ids = [];
      this.names = [];
      this.labels = [];
      return;
    }

    this.ids = filter.id;
    this.names = filter.name;
    this.labels = filter.label == null ? [] : filter.label;
    this.updateSelectedStackFromLabels(this.labels);
  }

  private fireFilter() {
    let filter: ServiceFilter = {
      id: this.ids,
      name: this.names,
      label: this.labels,
    };
    this.onChangeFunction(filter);
  }

  private initStackOptions() {
    let options:SelectItem[] = [{
      label:'None',
      value: null
    }];

    if (this.stacks != null) {
      let extraOptions = this.stacks
        .map(stackName => <SelectItem>{
          label: stackName,
          value: stackName,
        });
      options.push(...extraOptions);
    }

    this.stackOptions = options;
    if (this.stack != null) {
      let isStackValid = this.stacks.indexOf(this.stack) >= 0;
      if (!isStackValid) {
        this.stack = null;
      }
    }
  }

  private updateSelectedStackFromLabels(labels: string[]) {
    let stackLabels = this.stackService.extractLabelListStackName(labels);
    if (stackLabels.length != 1) {
      this.stack = null;
    } else {
      this.stack = stackLabels[0];
    }
  }

  private updateLabelsFromSelectedStack(stack: string) {
    let updatedLabels = this.labels
      .filter(label => !this.stackService.isStackLabel(label));
    if (stack != null) {
      let stackLabel = this.stackService.createStackLabel(stack);
      updatedLabels.push(stackLabel);
    }

    this.labels = updatedLabels;
  }
}
