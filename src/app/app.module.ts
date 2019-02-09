import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/pages/login_signin/signin.component';
import { HeaderComponent } from './components/header/header.component';

import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SignupComponent } from './components/pages/login_signup/signup.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import {AuthService} from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FooterComponent } from './footer/footer.component';
import {DefaultLayoutComponent} from './layouts/default-layout/default-layout.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import {UserService} from './services/user.service';
import { LogoutComponent } from './components/pages/logout/logout.component';
import {CanActivateViaAuthGuard} from './guards/CanActivateViaAuthGuard';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { ForgotPasswordConfirmationComponent } from './components/pages/forgot-password-confirmation/forgot-password-confirmation.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { RegisterActivationComponent } from './components/pages/register-activation/register-activation.component';
import { PageNotfoundComponent } from './components/pages/page-notfound/page-notfound.component';
import {ProfileUserComponent} from './components/pages/profile-user/profile-user.component';
import { ProfileUserUpdateComponent } from './components/pages/profile-user-update/profile-user-update.component';

const appRoutes: Routes = [{
  path: '',
  component: LoginLayoutComponent,
  children: [
    { path: '', component: SigninComponent },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
    },
    {
      path: 'forgot-password/confirmation',
      component: ForgotPasswordConfirmationComponent,
    },
    {
      path: 'reset-password/:token',
      component: ResetPasswordComponent,
    },
    {
      path: 'register/activate/:token',
      component: RegisterActivationComponent
    },
    { path: 'signup', component: SignupComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [
        CanActivateViaAuthGuard
      ]
    },
  ]
},
{
  path: '',
  component: DefaultLayoutComponent,
  children: [
    { path: 'index', component: HomePageComponent, canActivate: [
        CanActivateViaAuthGuard
      ]
    },
    { path: 'profile', component: ProfileUserComponent, canActivate: [
        CanActivateViaAuthGuard
      ]
    },
    { path: 'profile/update', component: ProfileUserUpdateComponent, canActivate: [
        CanActivateViaAuthGuard
      ]
    },
    {
      path: '',
      redirectTo: '/index',
      pathMatch: 'full',
      canActivate: [
        CanActivateViaAuthGuard
      ]
    },
  ]
},
{
  path: '',
  component: LoginLayoutComponent,
  children: [
    {
      path: '**',
      component: PageNotfoundComponent
    }
  ],
}];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    LoginLayoutComponent,
    FooterComponent,
    DefaultLayoutComponent,
    HomePageComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmationComponent,
    ResetPasswordComponent,
    RegisterActivationComponent,
    PageNotfoundComponent,
    ProfileUserComponent,
    ProfileUserUpdateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
    AuthService,
    UserService,
    CanActivateViaAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
