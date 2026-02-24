import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Dashboard } from './pages/dashboard';
import { Sidenav } from '../shared/components/sidenav/sidenav';

export const DASHBOARD_ROUTES: Routes = [
{
    path: '',
    component: Sidenav,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'home',
        component: Home
      }
    ]
  }
];