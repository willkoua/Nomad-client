import { Component, OnInit } from '@angular/core';
import {VideoService} from '../../../services/video.service';
import {Video} from '../../../models/video.model';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {filter} from 'rxjs-compat/operator/filter';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile-videos',
  templateUrl: './user-profile-videos.component.html',
  styleUrls: ['./user-profile-videos.component.css']
})
export class UserProfileVideosComponent implements OnInit {

  listVideos: Video[];
  user: User;

  constructor(
    private videoService: VideoService,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.authService.getProfile();
    this.listVideos = [];

    this.videoService.getListVideos().subscribe(
      value => {
        this.listVideos = value.results;
      },
      error => {
        // console.log(error);
      }
    );
  }

  deleteVideo(video: Video) {
    video.is_deleted = new Date();

    this.videoService.deleteVideo(video).subscribe(
      value => {
        const oldTabSize = this.listVideos.length
        const index = this.listVideos.findIndex((x) => x.id === value.id);
        this.listVideos.splice(index, 1);
        const newTabSize = this.listVideos.length
        if ((oldTabSize - 1) < newTabSize) {
          this.notificationService.error(
            null,
            value.title ? value.title : 'Une video' + ' a été supprimée');
        } else {
          this.notificationService.info(
            'Possible erreur',
            'Une possible erreur est survenue lors de la suppression de ' +
            value.title + '. Actualisez votre page. Si cela persiste, veillez nous contacter',
            {
              timeOut: 6000,
            });
        }
      },
      error => {
        // console.log(error);
      }
    );
  }

}
