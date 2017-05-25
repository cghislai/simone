import {Route} from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/docker',
  },
];
