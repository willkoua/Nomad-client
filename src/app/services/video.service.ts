import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import GlobalService from './globalService';
import {UploadInput} from 'ngx-uploader';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends GlobalService {
  url_update_video = environment.url_base_api + environment.paths_api.videos;
  url_save_video = environment.url_base_api + environment.paths_api.video_upload;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public createNewVideo(): UploadInput {
    return  {
      type: 'uploadAll',
      url: this.url_save_video,
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') },
      method: 'POST',
      data: { foo: 'bar' }
    };
  }

  updateVideo(video: Object, id: number): Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.patch<any>(
      this.url_update_video + id,
      video,
      {headers: headers});
  }
}
