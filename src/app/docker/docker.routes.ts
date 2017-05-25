import {Route} from '@angular/router';
import {DockerDashboardComponent} from './docker-dashboard/docker-dashboard.component';
import {DockerRouteComponent} from './docker-route/docker-route.component';
import {DockerTaskListComponent} from './docker-task-list/docker-task-list.component';
import {DockerServiceListComponent} from './docker-services/service-list/docker-service-list.component';

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
        ],
      },
    ],
  },
];
