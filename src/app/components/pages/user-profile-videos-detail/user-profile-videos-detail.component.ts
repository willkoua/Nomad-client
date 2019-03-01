import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {VideoService} from '../../../services/video.service';
import {AuthService} from '../../../services/auth.service';
import {Video} from '../../../models/video.model';
import {User} from '../../../models/user.model';
import {NotificationsService} from 'angular2-notifications';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile-videos-detail',
  templateUrl: './user-profile-videos-detail.component.html',
  styleUrls: ['./user-profile-videos-detail.component.css']
})
export class UserProfileVideosDetailComponent implements OnInit {

  video: Video;
  user: User;
  videoAtDelete: Video;

  constructor(
    private videoService: VideoService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationsService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.videoAtDelete = null;
  }

  ngOnInit() {
    this.user = this.authService.getProfile();
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.videoService.getVideo(+id).subscribe(
      value => {
        this.video = value;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteVideo(video: Video) {
    this.videoAtDelete.is_deleted = new Date();

    this.videoService.deleteVideo(this.videoAtDelete).subscribe(
      value => {
        const video_title = value.title ? value.title : 'video';
        this.notificationService.error(
          null,
          video_title + ' a été supprimée');
      },
      error => {
        // console.log(error);
      },
      () => {
        this.modalService.dismissAll();
        this.router.navigate(['/video/user']);
      }
    );
  }

  active_modal(content, video: Video) {
    this.modalService.open(content);
    this.videoAtDelete = video;
  }

}
