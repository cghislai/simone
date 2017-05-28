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
  BlockUIModule, CheckboxModule,
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
  SpinnerModule, TabViewModule,
  ToggleButtonModule,
} from 'primeng/primeng';
import {DockerPingStatusComponent} from './docker-ping-status/docker-ping-status.component';
import {DockerMenuBarComponent} from './docker-menu-bar/docker-menu-bar.component';
import {DockerDashboardComponent} from './docker-dashboard/docker-dashboard.component';
import {DockerServicesService} from './services/docker-services.service';
import {DockerImageLabelComponent} from './docker-image-label/docker-image-label.component';
import {DockerTaskListComponent} from './docker-tasks/task-list/docker-task-list.component';
import {DockerTasksService} from './services/docker-tasks.service';
import {ServiceModeComponent} from './docker-services/service-mode/service-mode.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {DOCKER_ROUTES} from './docker.routes';
import {DockerTaskColumnComponent} from './docker-tasks/task-list/task-column/docker-task-column.component';
import {DockerRouteComponent} from './docker-routes/docker-route.component';
import {ServiceFilterComponent} from './docker-services/service-list/service-filter/service-filter.component';
import {DockerServiceListComponent} from './docker-services/service-list/docker-service-list.component';
import {DockerServiceColumnComponent} from './docker-services/service-list/service-column/docker-service-column.component';
import {TaskFilterComponent} from './docker-tasks/task-list/task-filter/task-filter.component';
import { ContainerListComponent } from './docker-containers/container-list/container-list.component';
import { ContainerColumnComponent } from './docker-containers/container-list/container-column/container-column.component';
import { ContainerFilterComponent } from './docker-containers/container-list/container-filter/container-filter.component';
import {DockerContainersService} from './services/docker-containers.service';
import { UniqueIdComponent } from './unique-id/unique-id.component';
import { LabelsComponent } from './labels/labels.component';
import { ServiceDetailsComponent } from './docker-services/service-details/service-details.component';
import { ServiceSpecComponent } from './docker-services/service-spec/service-spec.component';
import { ServiceDetailsPageComponent } from './docker-services/service-details-page/service-details-page.component';
import { DockerTaskListPageComponent } from './docker-tasks/task-list-page/docker-task-list-page.component';
import { TaskDetailsComponent } from './docker-tasks/task-details/task-details.component';
import { TaskDetailsPageComponent } from './docker-tasks/task-details-page/task-details-page.component';
import { ContainerSpecComponent } from './docker-containers/container-spec/container-spec.component';
import { TaskTemplateComponent } from './docker-tasks/task-template/task-template.component';
import { ContainerDetailsComponent } from './docker-containers/container-details/container-details.component';
import { ContainerDetailsPageComponent } from './docker-containers/container-details-page/container-details-page.component';
import {UtilsModule} from '../utils/utils.module';
import { NetworkConfigComponent } from './docker-networks/network-config/network-config.component';
import { ContainerInspectInfoComponent } from './docker-containers/container-inspect-info/container-inspect-info.component';
import { ContainerLogsComponent } from './docker-containers/container-logs/container-logs.component';
import { ContainerStatsComponent } from './docker-containers/container-stats/container-stats.component';

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
    TabViewModule,
    BlockUIModule,
    CheckboxModule,

    UtilsModule,
  ],
  declarations: [
    DockerOptionsFormComponent,
    DockerOptionsPageComponent,
    DockerPingStatusComponent,
    DockerMenuBarComponent,
    DockerDashboardComponent,
    DockerServiceListComponent,
    DockerImageLabelComponent,
    DockerTaskListComponent,
    DockerServiceColumnComponent,
    ServiceModeComponent,
    DockerTaskColumnComponent,
    DockerRouteComponent,
    ServiceFilterComponent,
    TaskFilterComponent,
    ContainerListComponent,
    ContainerColumnComponent,
    ContainerFilterComponent,
    UniqueIdComponent,
    LabelsComponent,
    ServiceDetailsComponent,
    ServiceSpecComponent,
    ServiceDetailsPageComponent,
    DockerTaskListPageComponent,
    TaskDetailsComponent,
    TaskDetailsPageComponent,
    ContainerSpecComponent,
    TaskTemplateComponent,
    ContainerDetailsComponent,
    ContainerDetailsPageComponent,
    NetworkConfigComponent,
    ContainerInspectInfoComponent,
    ContainerLogsComponent,
    ContainerStatsComponent,
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
    DockerContainersService,
  ],
})
export class DockerModule {
}
