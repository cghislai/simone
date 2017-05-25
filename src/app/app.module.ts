import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {DockerModule} from './docker/docker.module';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),

    DockerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
