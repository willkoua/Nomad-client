import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import GlobalService from './globalService';
import {UploadInput} from 'ngx-uploader';
import {PagedResults, Video, Genre} from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends GlobalService {
  url_update_video = environment.url_base_api + environment.paths_api.video.update;
  url_save_list_video = environment.url_base_api + environment.paths_api.video.create_list;
  url_list_genre = environment.url_base_api + environment.paths_api.genre.list;
  url_delete_genre_video = environment.url_base_api + environment.paths_api.genre.delete;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public createNewVideo(): UploadInput {
    return  {
      type: 'uploadAll',
      url: this.url_save_list_video,
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') },
      method: 'POST'
      // data: { foo: 'bar' }
    };
  }

  public updateVideo(video: Object, id: number): Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.patch<any>(
      this.url_update_video + id,
      video,
      {headers: headers});
  }

  public getListVideos() {
    const headers = this.getHeaders();

    return this.httpClient.get<any>(
      this.url_save_list_video,
      {headers: headers}
    );
  }

  public getVideo(id: number) {
    const headers = this.getHeaders();

    return this.httpClient.get<Video>(
      this.url_update_video + id,
      {headers: headers}
    );
  }

  public deleteVideo(video: any) {
    const headers = this.getHeaders();

    return this.httpClient.patch<any>(
      this.url_update_video + video.id,
      video,
      {headers: headers}
    );
  }

  /**
   * Services Genre
   */
  public getListGenres(): Observable<PagedResults<Video>> {
    const headers = this.getHeaders();

    return this.httpClient.get<PagedResults<Video>>(
      this.url_list_genre,
      {headers: headers}
    );
  }

  public delGenreVideo(videoId: number, genreId: number) {
    const headers = this.getHeaders();

    return this.httpClient.patch<any>(
      this.url_delete_genre_video,
      {genre: genreId, video: videoId},
      {headers: headers}
    );
  }
}
