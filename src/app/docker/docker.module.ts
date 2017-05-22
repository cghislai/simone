import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DockerOptionsFormComponent} from './docker-options-form/docker-options-form.component';
import {DockerOptionsPageComponent} from './docker-options-page/docker-options-page.component';
import {DockerService} from './services/docker.service';
import {ButtonModule} from 'primeng/components/button/button';
import {FormsModule} from '@angular/forms';
import {DockerClient} from '../client/docker.client';
import {DockerOptionsService} from './services/docker-options.service';
import {
  GrowlModule,
  InputTextareaModule,
  InputTextModule, PanelModule,
  SelectButtonModule,
  SharedModule,
  SpinnerModule,
  ToggleButtonModule,
} from 'primeng/primeng';
import {DockerPingStatusComponent} from './docker-ping-status/docker-ping-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    ToggleButtonModule,
    SpinnerModule,
    GrowlModule,
    PanelModule,
  ],
  declarations: [
    DockerOptionsFormComponent,
    DockerOptionsPageComponent,
    DockerPingStatusComponent,
  ],
  exports: [
    DockerOptionsPageComponent,
    DockerPingStatusComponent,
  ],
  providers: [
    DockerClient,
    DockerOptionsService,
    DockerService,
  ],
})
export class DockerModule {
}
