import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DockerOptionsFormComponent} from './docker-options-form/docker-options-form.component';
import {DockerOptionsPageComponent} from './docker-options-page/docker-options-page.component';
import {DockerService} from './services/docker.service';
import {ButtonModule} from 'primeng/components/button/button';
import {FormsModule} from '@angular/forms';
import {DockerClient} from './client/docker.client';
import {DockerOptionsService} from './services/docker-options.service';
import {
  BlockUIModule,
  CheckboxModule,
  ChipsModule,
  DataTableModule, DropdownModule,
  GrowlModule, InplaceModule,
  InputTextareaModule,
  InputTextModule,
  MessagesModule,
  MultiSelectModule,
  OverlayPanelModule,
  PanelModule,
  SelectButtonModule,
  SharedModule,
  SpinnerModule,
  TabViewModule,
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
import {ContainerListComponent} from './docker-containers/container-list/container-list.component';
import {ContainerColumnComponent} from './docker-containers/container-list/container-column/container-column.component';
import {ContainerFilterComponent} from './docker-containers/container-list/container-filter/container-filter.component';
import {DockerContainersService} from './services/docker-containers.service';
import {UniqueIdComponent} from './unique-id/unique-id.component';
import {LabelsComponent} from './labels/labels.component';
import {ServiceDetailsComponent} from './docker-services/service-details/service-details.component';
import {ServiceSpecComponent} from './docker-services/service-spec/service-spec.component';
import {ServiceDetailsPageComponent} from './docker-services/service-details-page/service-details-page.component';
import {DockerTaskListPageComponent} from './docker-tasks/task-list-page/docker-task-list-page.component';
import {TaskDetailsComponent} from './docker-tasks/task-details/task-details.component';
import {TaskDetailsPageComponent} from './docker-tasks/task-details-page/task-details-page.component';
import {ContainerSpecComponent} from './docker-containers/container-spec/container-spec.component';
import {TaskTemplateComponent} from './docker-tasks/task-template/task-template.component';
import {ContainerDetailsComponent} from './docker-containers/container-details/container-details.component';
import {ContainerDetailsPageComponent} from './docker-containers/container-details-page/container-details-page.component';
import {UtilsModule} from '../utils/utils.module';
import {NetworkConfigComponent} from './docker-networks/network-config/network-config.component';
import {ContainerInspectInfoComponent} from './docker-containers/container-inspect-info/container-inspect-info.component';
import {ContainerStatsComponent} from './docker-containers/container-stats/container-stats.component';
import {ContainerLogsComponent} from './docker-containers/container-logs/container-logs.component';
import {ContainerPauseButtonComponent} from './docker-containers/container-pause-button/container-pause-button.component';
import {ContainerRestartButtonComponent} from './docker-containers/container-restart-button/container-restart-button.component';
import {ErrorService} from './services/error.service';
import {ContainerStopButtonComponent} from './docker-containers/container-stop-button/container-stop-button.component';
import {ContainerStatusIconComponent} from './docker-containers/container-status-icon/container-status-icon.component';
import {HttpClient} from './client/http.client';
import {ContainerRemoveButtonComponent} from './docker-containers/container-remove-button/coontainer-remove-button.component';
import {TaskFilterDesiredStateComponent} from './docker-tasks/task-filter-state/task-filter-state.component';
import {PortMappingsComponent} from './port-mappings/port-mappings.component';
import {VolumeListComponent} from './docker-volumes/volume-list/volume-list.component';
import {VolumeDetailsComponent} from './docker-volumes/volume-details/volume-details.component';
import {VolumeDetailsPageComponent} from './docker-volumes/volume-details-page/volume-details-page.component';
import {VolumeColumnComponent} from './docker-volumes/volume-list/volume-column/volume-column.component';
import {VolumeFilterComponent} from './docker-volumes/volume-list/volume-filter/volume-filter.component';
import {VolumeListPageComponent} from './docker-volumes/volume-list-page/volume-list-page.component';
import {DockerVolumesService} from './services/docker-volumes.service';
import {MountSpecComponent} from './mount-spec/mount-spec.component';
import {SecretListComponent} from './docker-secrets/secret-list/secret-list.component';
import {SecretListPageComponent} from './docker-secrets/secret-list-page/secret-list-page.component';
import {SecretColumnComponent} from './docker-secrets/secret-list/secret-column/secret-column.component';
import {SecretFilterComponent} from './docker-secrets/secret-list/secret-filter/secret-filter.component';
import {DockerSecretsService} from './services/docker-secrets.service';
import {SecretDetailsComponent} from './docker-secrets/secret-details/secret-details.component';
import {SecretDetailsPageComponent} from './docker-secrets/secret-details-page/secret-details-page.component';
import {NetworkListComponent} from './docker-networks/network-list/network-list.component';
import {NetworkListPageComponent} from './docker-networks/network-list-page/network-list-page.component';
import {NetworkDetailsComponent} from './docker-networks/network-details/network-details.component';
import {NetworkDetailsPageComponent} from './docker-networks/network-details-page/network-details-page.component';
import {NetworkColumnComponent} from './docker-networks/network-list/network-column/network-column.component';
import {NetworkFilterComponent} from './docker-networks/network-list/network-filter/network-filter.component';
import {DockerNetworksService} from './services/docker-netwoks.service';
import {DockerStacksService} from './services/docker-stacks.service';
import { NodeListComponent } from './docker-nodes/node-list/node-list.component';
import { NodeListPageComponent } from './docker-nodes/node-list-page/node-list-page.component';
import { NodeDetailsComponent } from './docker-nodes/node-details/node-details.component';
import { NodeDetailsPageComponent } from './docker-nodes/node-details-page/node-details-page.component';
import { NodeColumnComponent } from './docker-nodes/node-list/node-column/node-column.component';
import { NodeFilterComponent } from './docker-nodes/node-list/node-filter/node-filter.component';
import {DockerNodesService} from './services/docker-nodes.service';
import { NodeSpecComponent } from './docker-nodes/node-spec/node-spec.component';
import { EditableFieldComponent } from '../utils/editable-field/editable-field.component';

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
    MessagesModule,
    DropdownModule,
    InplaceModule,

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
    ContainerPauseButtonComponent,
    ContainerRestartButtonComponent,
    ContainerStopButtonComponent,
    ContainerStatusIconComponent,
    ContainerRemoveButtonComponent,
    TaskFilterDesiredStateComponent,
    PortMappingsComponent,
    VolumeListComponent,
    VolumeDetailsComponent,
    VolumeDetailsPageComponent,
    VolumeColumnComponent,
    VolumeFilterComponent,
    VolumeListPageComponent,
    MountSpecComponent,
    SecretListComponent,
    SecretListPageComponent,
    SecretColumnComponent,
    SecretFilterComponent,
    SecretDetailsComponent,
    SecretDetailsPageComponent,
    NetworkListComponent,
    NetworkListPageComponent,
    NetworkDetailsComponent,
    NetworkDetailsPageComponent,
    NetworkColumnComponent,
    NetworkFilterComponent,
    NodeListComponent,
    NodeListPageComponent,
    NodeDetailsComponent,
    NodeDetailsPageComponent,
    NodeColumnComponent,
    NodeFilterComponent,
    NodeSpecComponent,
    EditableFieldComponent,
  ],
  exports: [
    RouterModule,
    DockerDashboardComponent,
    DockerPingStatusComponent,
  ],
  providers: [
    HttpClient,
    DockerClient,
    DockerOptionsService,
    DockerService,
    DockerServicesService,
    DockerTasksService,
    DockerContainersService,
    DockerVolumesService,
    DockerSecretsService,
    DockerNetworksService,
    DockerNodesService,
    DockerStacksService,
    ErrorService,
  ],
})
export class DockerModule {
}
