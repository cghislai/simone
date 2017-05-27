import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {KeysArrayPipe} from './keys-array.pipe';
import { ExpandBoxComponent } from './expand-box/expand-box.component';

@NgModule({
  declarations: [
    KeysArrayPipe,
    ExpandBoxComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    KeysArrayPipe,
    ExpandBoxComponent,
  ]
})
export class UtilsModule {
}
