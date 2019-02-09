import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import GlobalService from './globalService';

@Injectable()
export class UserService extends GlobalService {
  url_profile = environment.url_base_api + environment.paths_api.profile;
  url_activation = environment.url_base_api + environment.paths_api.activation;
  url_save_user = environment.url_base_api + environment.paths_api.users;
  url_update_user = environment.url_base_api + environment.paths_api.profile;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getProfile(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>(
      this.url_profile,
      {headers: headers}
    );
  }

  activate(token: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.post<any>(
      this.url_activation,
      {
        activation_token: token
      },
      {headers: headers}
    );
  }

  createNewUser(user: Object): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.post<any>(
      this.url_save_user,
      user,
      {headers: headers});
  }

  updateUser(user: Object): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.patch<any>(
      this.url_update_user,
      user,
      {headers: headers});
  }

  changePassword(id: number, password: string, new_password: string): Observable<any>  {
    const headers = this.getHeaders();
    return this.httpClient.patch<any>(
      this.url_profile,
      {
        password: password,
        new_password: new_password
      },
      {headers: headers}
    );
  }
}
