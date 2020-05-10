import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/credentials/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/credentials/register/register.component';
import { ForgotPasswordComponent } from './components/credentials/forgot-password/forgot-password.component';
import { SideMenuComponent } from './components/dashboard/side-menu/side-menu.component';
import { DashboardIndexComponent } from './components/dashboard/main-view/dashboard-index/dashboard-index.component';
import { MapsComponent } from './components/dashboard/main-view/maps/maps.component';
import { StoresComponent } from './components/dashboard/main-view/stores/stores.component';
import { PreviewComponent } from './components/dashboard/main-view/preview/preview.component';
import { SettingsComponent } from './components/dashboard/main-view/settings/settings.component';
import { InstallationComponent } from './components/dashboard/main-view/installation/installation.component';
import { AccountComponent } from './components/dashboard/main-view/account/account.component';
import { HelpComponent } from './components/dashboard/main-view/help/help.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { AlertComponent } from './components/common/alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { GeneralComponent } from './components/dashboard/main-view/account/general/general.component';
import { BillingInfoComponent } from './components/dashboard/main-view/account/billing-info/billing-info.component';
import { ApiKeysComponent } from './components/dashboard/main-view/account/api-keys/api-keys.component';

import { environment } from 'src/environments/environment';
import { GeneralSettingsComponent } from './components/dashboard/main-view/maps/general-settings/general-settings.component';
import { CustomComponent } from './components/dashboard/main-view/maps/custom/custom.component';
import { AdvancedCustomizationComponent } from './components/dashboard/main-view/maps/advanced-customization/advanced-customization.component';

@NgModule({
declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SideMenuComponent,
    DashboardIndexComponent,
    MapsComponent,
    StoresComponent,
    PreviewComponent,
    SettingsComponent,
    InstallationComponent,
    AccountComponent,
    HelpComponent,
    NotFoundComponent,
    CredentialsComponent,
    AlertComponent,
    GeneralComponent,
    BillingInfoComponent,
    ApiKeysComponent,
    GeneralSettingsComponent,
    CustomComponent,
    AdvancedCustomizationComponent
],
imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
        apiKey: environment.googleDevAPIKey
    })
],
providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
    AuthGuard
],
bootstrap: [AppComponent]
})
export class AppModule { }
