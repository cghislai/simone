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
  DataTableModule,
  GrowlModule,
  InputTextareaModule,
  InputTextModule, MultiSelectModule, OverlayPanelModule, PanelModule, PrimeTemplate,
  SelectButtonModule,
  SharedModule,
  SpinnerModule,
  ToggleButtonModule,
} from 'primeng/primeng';
import {DockerPingStatusComponent} from './docker-ping-status/docker-ping-status.component';
import { DockerMenuBarComponent } from './docker-menu-bar/docker-menu-bar.component';
import { DockerDashboardComponent } from './docker-dashboard/docker-dashboard.component';
import {DockerServicesService} from './services/docker-services.service';
import { DockerServiceComponent } from './docker-service/docker-service.component';
import { DockerServiceListComponent } from './docker-service-list/docker-service-list.component';
import { DockerImageLabelComponent } from './docker-image-label/docker-image-label.component';
import { DockerTaskComponent } from './docker-task/docker-task.component';
import { DockerTaskListComponent } from './docker-task-list/docker-task-list.component';
import {DockerTasksService} from './services/docker-tasks.service';
import { DockerServiceColumnComponent } from './docker-service-list/docker-service-column/docker-service-column.component';
import { ServiceModeComponent } from './docker-service/service-mode/service-mode.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
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
    DataTableModule,
    MultiSelectModule,
  ],
  declarations: [
    DockerOptionsFormComponent,
    DockerOptionsPageComponent,
    DockerPingStatusComponent,
    DockerMenuBarComponent,
    DockerDashboardComponent,
    DockerServiceComponent,
    DockerServiceListComponent,
    DockerImageLabelComponent,
    DockerTaskComponent,
    DockerTaskListComponent,
    DockerServiceColumnComponent,
    ServiceModeComponent,
  ],
  exports: [
    DockerDashboardComponent,
    DockerPingStatusComponent,
  ],
  providers: [
    DockerClient,
    DockerOptionsService,
    DockerService,
    DockerServicesService,
    DockerTasksService,
  ],
})
export class DockerModule {
}
