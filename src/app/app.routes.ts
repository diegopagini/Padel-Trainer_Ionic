import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
    loadChildren: () => import('./auth/auth.routes').then((r) => r.routes),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
