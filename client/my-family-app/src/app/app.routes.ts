import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'create-account',
    loadComponent: () => import('./create-account/create-account.page').then( m => m.CreateAccountPage)
  },
  {
    path: 'login-page',
    loadComponent: () => import('./login-page/login-page.page').then(m => m.LoginPagePage)
  },
];
