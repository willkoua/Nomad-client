import { Component, OnInit } from '@angular/core';
import {VideoService} from '../../../services/video.service';
import {Video} from '../../../models/video.model';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {NotificationsService} from 'angular2-notifications';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile-videos',
  templateUrl: './user-profile-videos.component.html',
  styleUrls: ['./user-profile-videos.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class UserProfileVideosComponent implements OnInit {

  listVideos: Video[];
  user: User;
  videoAtDelete: Video;

  constructor(
    private videoService: VideoService,
    private authService: AuthService,
    private notificationService: NotificationsService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.videoAtDelete = null;
  }

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

  deleteVideo() {
    this.videoAtDelete.is_deleted = new Date();

    this.videoService.deleteVideo(this.videoAtDelete).subscribe(
      value => {
        const oldTabSize = this.listVideos.length - 1
        const index = this.listVideos.findIndex((x) => x.id === value.id);
        this.listVideos.splice(index, 1);
        const newTabSize = this.listVideos.length

        if (oldTabSize <= newTabSize) {
          const video_title = value.title ? value.title : 'video';
          this.notificationService.error(
            null,
            video_title + ' a été supprimée');
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
      },
      () => {
        this.modalService.dismissAll();
      }
    );
  }

  active_modal(content, video: Video) {
    this.modalService.open(content);
    this.videoAtDelete = video;
  }

}
