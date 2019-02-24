import { Component, OnInit } from '@angular/core';
import {VideoService} from '../../../services/video.service';
import {Video} from '../../../models/video.model';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getProfile();

    this.videoService.getListVideos().subscribe(
      value => {
        this.listVideos = value.results;
        console.log(this.listVideos);
      },
      error => {
        console.log(error);
      }
    );
  }

}
