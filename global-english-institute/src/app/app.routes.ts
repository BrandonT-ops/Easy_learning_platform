import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'programs',
    loadComponent: () => import('./features/programs/programs.component').then(m => m.ProgramsComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'placement-test',
    loadComponent: () => import('./features/placement-test/placement-test.component').then(m => m.PlacementTestComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/registration/registration.component').then(m => m.RegistrationComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./features/legal/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
  },
  {
    path: 'terms-of-service',
    loadComponent: () => import('./features/legal/terms-of-service.component').then(m => m.TermsOfServiceComponent),
  },
  {
    path: 'data-usage',
    loadComponent: () => import('./features/legal/data-usage.component').then(m => m.DataUsageComponent),
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./features/admin/login/admin-login.component').then(m => m.AdminLoginComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
      },
      {
        path: 'tests',
        loadComponent: () => import('./features/admin/tests/admin-tests.component').then(m => m.AdminTestsComponent),
      },
      {
        path: 'registrations',
        loadComponent: () => import('./features/admin/registrations/admin-registrations.component').then(m => m.AdminRegistrationsComponent),
      },
      {
        path: 'testimonials',
        loadComponent: () => import('./features/admin/testimonials/admin-testimonials.component').then(m => m.AdminTestimonialsComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/admin/settings/admin-settings.component').then(m => m.AdminSettingsComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
