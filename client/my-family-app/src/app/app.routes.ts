import { Routes } from '@angular/router';
import {AddToFamilyTreePage} from "./add-to-family-tree/add-to-family-tree.page";

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
  {
    path: 'add-to-family-tree',
    loadComponent: () => import('./add-to-family-tree/add-to-family-tree.page').then(m => m.AddToFamilyTreePage)
  },
];
