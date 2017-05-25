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
  ChipsModule,
  DataTableModule,
  GrowlModule,
  InputTextareaModule,
  InputTextModule,
  MultiSelectModule,
  OverlayPanelModule,
  PanelModule,
  SelectButtonModule,
  SharedModule,
  SpinnerModule,
  ToggleButtonModule,
} from 'primeng/primeng';
import {DockerPingStatusComponent} from './docker-ping-status/docker-ping-status.component';
import {DockerMenuBarComponent} from './docker-menu-bar/docker-menu-bar.component';
import {DockerDashboardComponent} from './docker-dashboard/docker-dashboard.component';
import {DockerServicesService} from './services/docker-services.service';
import {DockerServiceComponent} from './docker-services/docker-service.component';
import {DockerImageLabelComponent} from './docker-image-label/docker-image-label.component';
import {DockerTaskComponent} from './docker-task/docker-task.component';
import {DockerTaskListComponent} from './docker-task-list/docker-task-list.component';
import {DockerTasksService} from './services/docker-tasks.service';
import {ServiceModeComponent} from './docker-services/service-mode/service-mode.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {DOCKER_ROUTES} from './docker.routes';
import {DockerTaskColumnComponent} from './docker-task-list/docker-task-column/docker-task-column.component';
import {DockerRouteComponent} from './docker-route/docker-route.component';
import {ServiceFilterComponent} from './docker-services/service-list/service-filter/service-filter.component';
import {DockerServiceListComponent} from './docker-services/service-list/docker-service-list.component';
import {DockerServiceColumnComponent} from './docker-services/service-list/service-column/docker-service-column.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(DOCKER_ROUTES),

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
    ChipsModule,
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
    DockerTaskColumnComponent,
    DockerRouteComponent,
    ServiceFilterComponent,
  ],
  exports: [
    RouterModule,
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
