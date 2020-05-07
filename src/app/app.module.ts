import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    AlertComponent
],
imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
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
