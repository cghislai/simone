import {Component, EventEmitter, Input, OnInit, Optional, Output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SingleActiveEditableFieldProvider} from './SingleActiveEditableFieldProvider';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditableFieldComponent,
      multi: true,
    },
  ],
})
export class EditableFieldComponent implements OnInit, ControlValueAccessor {

  value: any;
  editing: boolean;

  @Input()
  rollbackVisible: boolean;
  @Input()
  editable: boolean = true;
  @Input()
  showEditButton: boolean = false;

  @Output()
  private touched = new EventEmitter<any>();
  @Output()
  private rollback = new EventEmitter<any>();

  private initialValue: any;
  private onChangeFunction: Function;
  private onTouchedFunction: Function;


  constructor(@Optional() private singleActiveProvider: SingleActiveEditableFieldProvider) {
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.initialValue = obj;
    this.setCurrentValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  onStartEdit() {
    if (!this.editable) {
      return;
    }
    this.editing = true;
    this.onTouchedFunction();
    this.touched.next(true);

    if (this.singleActiveProvider != null) {
      this.singleActiveProvider.setActive(this);
    }
  }

  onConfirm() {
    this.editing = false;
    this.initialValue = this.value;
    this.onChangeFunction(this.value);
  }

  onCancel() {
    this.editing = false;
    this.setCurrentValue(this.initialValue);
  }

  onRollback() {
    this.editing = false;
    this.rollback.next(true);
  }

  private setCurrentValue(obj: any) {
    if (obj == null) {
      this.value == null;
      return;
    }
    if (typeof obj === 'array' || obj instanceof Array) {
      this.value = [...obj];
    } else if (typeof obj === 'object') {
      this.value = Object.assign({}, obj);
    } else if (typeof obj === 'string') {
      this.value = `${obj}`;
    } else {
      this.value = obj;
    }
  }
}
