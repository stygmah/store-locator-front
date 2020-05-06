import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/credentials/login/login.component';
import { RegisterComponent } from './components/credentials/register/register.component';
import { ForgotPasswordComponent } from './components/credentials/forgot-password/forgot-password.component';
import { DashboardIndexComponent } from './components/dashboard/main-view/dashboard-index/dashboard-index.component';
import { MapsComponent } from './components/dashboard/main-view/maps/maps.component';
import { StoresComponent } from './components/dashboard/main-view/stores/stores.component';
import { PreviewComponent } from './components/dashboard/main-view/preview/preview.component';
import { InstallationComponent } from './components/dashboard/main-view/installation/installation.component';
import { SettingsComponent } from './components/dashboard/main-view/settings/settings.component';
import { HelpComponent } from './components/dashboard/main-view/help/help.component';
import { AccountComponent } from './components/dashboard/main-view/account/account.component';
import { CredentialsComponent } from './components/credentials/credentials.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:
    [
      { path: '', component: DashboardIndexComponent},
      { path: 'maps', component: MapsComponent },
      { path: 'stores', component: StoresComponent},
      { path: 'preview', component: PreviewComponent},
      { path: 'installation', component: InstallationComponent},
      { path: 'settings', component: SettingsComponent},
      { path: 'help', component: HelpComponent},
      { path: 'account', component: AccountComponent},
    ]
  },
  {
    path: 'login',
    component: CredentialsComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'password-recovery', component: ForgotPasswordComponent},
    ]
  },

  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
