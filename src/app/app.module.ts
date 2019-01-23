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

const appRoutes: Routes = [{
  path: '',
  component: LoginLayoutComponent,
  children: [
    { path: '', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [
        CanActivateViaAuthGuard
      ] },
  ]
},
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'index', component: HomePageComponent, canActivate: [
          CanActivateViaAuthGuard
        ] },
    ]
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
