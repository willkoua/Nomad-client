import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import GlobalService from './globalService';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

interface AuthenticationResponse {
  token: string;
}

@Injectable()
export class AuthService extends GlobalService {
  url_authentication = environment.url_base_api + environment.paths_api.authentication;
  url_reset_password = environment.url_base_api + environment.paths_api.reset_password;
  url_change_password = environment.url_base_api + environment.paths_api.change_password;

  constructor(private httpClient: HttpClient) {
    super();
  }

  authenticate(email: string, password: string): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(
      this.url_authentication,
      {
        login: email,
        password: password
      }
    );
  }

  resetPassword(email: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.post<any>(
      this.url_reset_password,
      {
        email: email
      },
      {headers: headers}
    );
  }

  changePassword(token: string, password: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.post<any>(
      this.url_change_password,
      {
        token: token,
        new_password: password
      },
      {headers: headers}
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }

  getProfile() {
    return JSON.parse(localStorage.getItem('userProfile'));
  }

}
