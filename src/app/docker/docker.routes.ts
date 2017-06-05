import {Route} from '@angular/router';
import {DockerDashboardComponent} from './docker-dashboard/docker-dashboard.component';
import {DockerRouteComponent} from './docker-routes/docker-route.component';
import {DockerServiceListComponent} from './docker-services/service-list/docker-service-list.component';
import {ContainerListComponent} from './docker-containers/container-list/container-list.component';
import {ServiceDetailsPageComponent} from './docker-services/service-details-page/service-details-page.component';
import {DockerTaskListPageComponent} from './docker-tasks/task-list-page/docker-task-list-page.component';
import {TaskDetailsPageComponent} from './docker-tasks/task-details-page/task-details-page.component';
import {ContainerDetailsPageComponent} from './docker-containers/container-details-page/container-details-page.component';
import {VolumeListPageComponent} from './docker-volumes/volume-list-page/volume-list-page.component';
import {VolumeDetailsPageComponent} from './docker-volumes/volume-details-page/volume-details-page.component';
import {SecretListPageComponent} from './docker-secrets/secret-list-page/secret-list-page.component';
import {SecretDetailsPageComponent} from './docker-secrets/secret-details-page/secret-details-page.component';
import {NetworkListPageComponent} from './docker-networks/network-list-page/network-list-page.component';
import {NetworkDetailsPageComponent} from './docker-networks/network-details-page/network-details-page.component';
import {NodeListPageComponent} from './docker-nodes/node-list-page/node-list-page.component';
import {NodeDetailsPageComponent} from './docker-nodes/node-details-page/node-details-page.component';

export const DOCKER_ROUTES: Route[] = [
  {
    path: 'docker',
    children: [
      {
        path: '',
        component: DockerRouteComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'services',
          },
          {
            path: 'dashboard',
            component: DockerDashboardComponent,
          },
          {
            path: 'services',
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: DockerServiceListComponent,
              },
              {
                path: ':id',
                component: ServiceDetailsPageComponent,
              },
            ],
          },
          {
            path: 'tasks',
            children: [{
              path: '',
              pathMatch: 'full',
              component: DockerTaskListPageComponent,
            }, {
              path: ':id',
              component: TaskDetailsPageComponent,
            }],
          },
          {
            path: 'containers',
            children: [{
              path: '',
              pathMatch: 'full',
              component: ContainerListComponent,
            }, {
              path: ':id',
              component: ContainerDetailsPageComponent,
            }],
          },
          {
            path: 'volumes',
            children: [{
              path: '',
              pathMatch: 'full',
              component: VolumeListPageComponent,
            }, {
              path: ':id',
              component: VolumeDetailsPageComponent,
            }],
          },
          {
            path: 'secrets',
            children: [{
              path: '',
              pathMatch: 'full',
              component: SecretListPageComponent,
            }, {
              path: ':id',
              component: SecretDetailsPageComponent,
            }],
          },
          {
            path: 'networks',
            children: [{
              path: '',
              pathMatch: 'full',
              component: NetworkListPageComponent,
            }, {
              path: ':id',
              component: NetworkDetailsPageComponent,
            }],
          },
          {
            path: 'nodes',
            children: [{
              path: '',
              pathMatch: 'full',
              component: NodeListPageComponent,
            }, {
              path: ':id',
              component: NodeDetailsPageComponent,
            }],
          },
        ],
      },
    ],
  },
];
