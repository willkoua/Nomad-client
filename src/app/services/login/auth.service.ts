import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import GlobalService from '../globalService';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';

interface AuthenticationResponse {
  token: string;
}

@Injectable()
export class AuthService extends GlobalService {
  url_save_user = environment.url_base_api + environment.paths_api.users;
  url_authentication = environment.url_base_api + environment.paths_api.authentication;

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

  createNewUser(user: Object): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.post<any>(
      this.url_save_user,
      user,
      {headers: headers});
  }

}
