import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Dashboard } from './pages/dashboard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
];