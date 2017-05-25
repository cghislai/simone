import {Route} from '@angular/router';
import {DockerDashboardComponent} from './docker-dashboard/docker-dashboard.component';
import {DockerRouteComponent} from './docker-routes/docker-route.component';
import {DockerTaskListComponent} from './docker-tasks/task-list/docker-task-list.component';
import {DockerServiceListComponent} from './docker-services/service-list/docker-service-list.component';
import {ContainerListComponent} from './docker-containers/container-list/container-list.component';

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
            ],
          },
          {
            path: 'tasks',
            children: [{
              path: '',
              pathMatch: 'full',
              component: DockerTaskListComponent,
            }],
          },
          {
            path: 'containers',
            children: [{
              path: '',
              pathMatch: 'full',
              component: ContainerListComponent,
            }],
          },
        ],
      },
    ],
  },
];
