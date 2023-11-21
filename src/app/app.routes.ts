import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'wellcome',
    loadComponent: () => import('./modules/wellcome/wellcome.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.page'),
  },
  {
    path: 'about-me',
    loadComponent: () => import('./modules/about-me/about-me.component'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./modules/auth/auth.component'),
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((r) => r.routes),
  },
  {
    path: '',
    redirectTo: 'wellcome',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
