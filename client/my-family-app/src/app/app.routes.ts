import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'create-account',
    loadComponent: () => import('./pages/create-account/create-account.page').then(m => m.CreateAccountPage)
  },
  {
    path: 'login-page',
    loadComponent: () => import('./pages/login-page/login-page.page').then(m => m.LoginPagePage)
  },

  {
    path: 'welcome-page',
    loadComponent: () => import('./pages/welcome-page/welcome-page.page').then(m => m.WelcomePagePage)
  },
  {
    path: 'add-family-step-3',
    loadComponent: () => import('./pages/add-family-step-3/add-family-step-3.page').then(m => m.AddFamilyStep3Page)
  },
  {
    path: 'family-member-form',
    loadComponent: () => import('./components/family-member-form/family-member-form.component').then( m => m.FamilyMemberFormComponent)
  },
  {
    path: 'family-tree',
    loadComponent: () => import('./components/family-tree-visualization/family-tree-visualization.component').then(m => m.FamilyTreeVisualizationComponent)
  }

];
