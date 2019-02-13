import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

export default class GlobalService {

  getHeaders(content_type = 'application/json') {
    const options = {
      'Content-Type': content_type,
      'Accept-Language': environment.default_language,
    };

    const token = localStorage.getItem('token');
    if (token) {
      options['Authorization'] = 'Token ' + token;
    }
    const header = new HttpHeaders(options);
    return header;
  }
}
