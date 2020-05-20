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
import { AuthGuard } from './guards/auth.guard';
import { GeneralComponent } from './components/dashboard/main-view/account/general/general.component';
import { BillingInfoComponent } from './components/dashboard/main-view/account/billing-info/billing-info.component';
import { ApiKeysComponent } from './components/dashboard/main-view/account/api-keys/api-keys.component';
import { GeneralSettingsComponent } from './components/dashboard/main-view/maps/general-settings/general-settings.component';
import { CustomComponent } from './components/dashboard/main-view/maps/custom/custom.component';
import { AdvancedCustomizationComponent } from './components/dashboard/main-view/maps/advanced-customization/advanced-customization.component';
import { ThemesComponent } from './components/dashboard/main-view/maps/themes/themes.component';
import { PinsComponent } from './components/dashboard/main-view/maps/pins/pins.component';
import { CreateOrEditComponent } from './components/dashboard/main-view/stores/create-or-edit/create-or-edit.component';

const routes: Routes = [
{
    path: '',
    component: DashboardComponent,
    children:
        [
        { path: '', component: DashboardIndexComponent},
        {
            path: 'maps',
            component: MapsComponent,
            children:
            [
                { path: '', redirectTo: 'general-settings', pathMatch: 'full'},
                { path: 'general-settings', component: GeneralSettingsComponent},
                { path: 'themes', component: ThemesComponent},
                { path: 'pins', component: PinsComponent},
                { path: 'customization', component: CustomComponent},
                { path: 'advanced', component: AdvancedCustomizationComponent},
            ]
        },
        { path: 'stores', component: StoresComponent},
        { path: 'edit-store', component: CreateOrEditComponent},
        { path: 'edit-store/:id', component: CreateOrEditComponent},
        { path: 'preview', component: PreviewComponent},
        { path: 'installation', component: InstallationComponent},
        { path: 'settings', component: SettingsComponent},
        { path: 'help', component: HelpComponent},
        {
            path: 'account',
            component: AccountComponent,
            canActivateChild: [AuthGuard],
            children:
            [
                { path: '', redirectTo: 'general', pathMatch: 'full'},
                { path: 'general', component: GeneralComponent},
                { path: 'billing', component: BillingInfoComponent},
                { path: 'api-keys', component: ApiKeysComponent}
            ]
        },
        ],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
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
