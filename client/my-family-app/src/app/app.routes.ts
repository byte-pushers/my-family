import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'create-event',
    loadComponent: () => import('./pages/create-event/create-event.page').then(m => m.CreateEventPage) // Set CreateEventPage as the default
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
    path: 'add-family-step-2',
    loadComponent: () => import('./pages/add-family-step-2/add-family-step-2.page').then( m => m.AddFamilyStep2Page)
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
    loadComponent: () => import('./pages/family-tree/family-tree.page').then( m => m.FamilyTreePage)
  },
  {
    path: 'event-signup',
    loadComponent: () => import('./pages/event-signup/event-signup.page').then( m => m.EventSignupPage)
  }
];
