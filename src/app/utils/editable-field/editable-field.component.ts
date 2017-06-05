import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
  @Output()
  private touched = new EventEmitter<any>();
  @Output()
  private rollback = new EventEmitter<any>();

  private initialValue: any;
  private onChangeFunction: Function;
  private onTouchedFunction: Function;


  constructor() {
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
    this.editing = true;
    this.onTouchedFunction();
    this.touched.next(true);
  }

  onConfirm() {
    this.editing = false;
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
    } else {
      this.value = obj;
    }
  }
}
