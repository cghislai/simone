import {Route} from '@angular/router';
import {DockerDashboardComponent} from './docker-dashboard/docker-dashboard.component';
import {DockerRouteComponent} from './docker-routes/docker-route.component';
import {DockerTaskListComponent} from './docker-tasks/task-list/docker-task-list.component';
import {DockerServiceListComponent} from './docker-services/service-list/docker-service-list.component';
import {ContainerListComponent} from './docker-containers/container-list/container-list.component';
import {ServiceDetailsComponent} from './docker-services/service-details/service-details.component';
import {ServiceDetailsPageComponent} from './docker-services/service-details-page/service-details-page.component';
import {DockerTaskListPageComponent} from './docker-tasks/task-list-page/docker-task-list-page.component';
import {TaskDetailsPageComponent} from './docker-tasks/task-details-page/task-details-page.component';
import {ContainerDetailsPageComponent} from './docker-containers/container-details-page/container-details-page.component';

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
        ],
      },
    ],
  },
];
