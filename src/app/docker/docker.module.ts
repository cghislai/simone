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
  InputTextModule, OverlayPanelModule, PanelModule,
  SelectButtonModule,
  SharedModule,
  SpinnerModule,
  ToggleButtonModule,
} from 'primeng/primeng';
import {DockerPingStatusComponent} from './docker-ping-status/docker-ping-status.component';
import { DockerMenuBarComponent } from './docker-menu-bar/docker-menu-bar.component';
import { DockerDashboardComponent } from './docker-dashboard/docker-dashboard.component';

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
    OverlayPanelModule,
  ],
  declarations: [
    DockerOptionsFormComponent,
    DockerOptionsPageComponent,
    DockerPingStatusComponent,
    DockerMenuBarComponent,
    DockerDashboardComponent,
  ],
  exports: [
    DockerDashboardComponent,
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
