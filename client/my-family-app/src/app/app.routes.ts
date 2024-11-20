import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome-page',
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
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'add-to-family',
    loadComponent: () => import('./pages/add-to-family/add-to-family.page').then( m => m.AddToFamilyPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(({ ProfilePage }) => ProfilePage)
  },
  {
    path: 'new-message',
    loadComponent: () => import('./pages/chat/new-message/new-message.page').then( m => m.NewMessagePage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/profile/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/profile/events/events.page').then( m => m.EventsPage)
  },
  {
    path: 'media',
    loadComponent: () => import('./pages/profile/media/media.page').then( m => m.MediaPage)
  },
  {
    path: 'search-results',
    loadComponent: () => import('./pages/search-results/search-results.page').then( m => m.SearchResultsPage)
  },
  {
    path: 'tree-loading',
    loadComponent: () => import('./pages/tree-loading/tree-loading.page').then( m => m.TreeLoadingPage)
  },
  {
    path: 'subscription-plan',
    loadComponent: () => import('./pages/subscription-plan/subscription-plan.page').then( m => m.SubscriptionPlanPage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./pages/payment-page/payment-page.page').then( m => m.PaymentPage)
  }
];
