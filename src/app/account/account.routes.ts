import { Routes } from '@angular/router';
import { AccountDashboardComponent } from './pages/account-dashboard/account-dashboard.component';
import { AccountProfileComponent } from './pages/account-profile/account-profile.component';
import { AccountSecurityComponent } from './pages/account-security/account-security.component';

export const ACCOUNT_ROUTES: Routes = [
  { path: '', component: AccountDashboardComponent },
  { path: 'profile', component: AccountProfileComponent },
  { path: 'security', component: AccountSecurityComponent },
];
