

import {Injectable} from '@angular/core';
import {EditableFieldComponent} from './editable-field.component';

@Injectable()
export class SingleActiveEditableFieldProvider {

  activeField: EditableFieldComponent;

  setActive(field: EditableFieldComponent) {
    if (this.activeField != null && field !== this.activeField) {
      this.activeField.onCancel();
    }
    this.activeField = field;
  }
}
