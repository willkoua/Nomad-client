import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {NotificationsService} from 'angular2-notifications';

import {Video} from '../../../models/video.model';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {VideoService} from '../../../services/video.service';

@Component({
  selector: 'app-user-profile-videos-update',
  templateUrl: './user-profile-videos-update.component.html',
  styleUrls: ['./user-profile-videos-update.component.css']
})
export class UserProfileVideosUpdateComponent implements OnInit {

  formUpdateVideo: FormGroup;
  video: Video;
  user: User;

  constructor(
    private formUpdateVideoBuider: FormBuilder,
    private videoService: VideoService,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.video = null;
  }

  ngOnInit() {
    this.initForm()
    this.user = this.authService.getProfile();
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.videoService.getVideo(+id).subscribe(
      value => {
        this.video = value.results[0];
      },
      error => {
        this.notificationService.error(null, 'video not found');
        this.router.navigate(['/video/user']);
      },
      () => {
        this.initForm();
      }
    );
  }

  initForm() {
    this.formUpdateVideo = this.formUpdateVideoBuider.group({
      id: [this.video ? this.video.id : null, [Validators.required]],
      title: [this.video ? this.video.title : null],
      description: [this.video ? this.video.description : null],
    });
  }

  onSubmit() {
    const video = {
      id: this.formUpdateVideo.get('id').value,
      title: this.formUpdateVideo.get('title').value,
      description: this.formUpdateVideo.get('description').value
    };

    this.videoService.updateVideo(video, video.id).subscribe(
      value => {
        if (value) {
          this.notificationService.success(null, value.title + ' a été modifiée');
        } else {
          this.notificationService.error(null, 'Erreur lors de la modification');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
