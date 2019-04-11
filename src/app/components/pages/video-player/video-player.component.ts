import {Component, OnInit, ViewChild, Input, Renderer2} from '@angular/core';
import {Video} from '../../../models/video.model';
import {VideoService} from '../../../services/video.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video.component.css', './icons.css', './video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  // @ViewChild('video') matVideo: MatVideoComponent;

  @Input() src: string = null;
  @Input() title: string = null;
  @Input() poster: string = null;
  @Input() preload: boolean;
  @Input() loop: boolean;
  @Input() autoplay: boolean;
  @Input() spinner: string;
  @Input() fullscreen: boolean;
  @Input() download: boolean;
  @Input() overlay: string = null;

  videoP: Video;
  video: HTMLVideoElement;

  constructor(
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    // this.video = this.matVideo.getVideoTag();
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.videoService.getVideo(+id).subscribe(
      value => {
        this.videoP = value;
      },
      error => {
        console.log(error);
      },
      () => {
        this.src = this.getPathVideo();
        this.overlay = null;
        this.title = this.videoP.title;
        this.preload = true;
        this.loop = true;
        this.autoplay = false;
        this.fullscreen = false;
        this.download = false;
        this.spinner = 'spin';
        this.poster = '';
      }
    );
    // this.renderer.listen(this.video, 'ended', () => console.log('video ended'));
    // this.video.addEventListener('ended', () => console.log('video ended'));
  }

  getPathVideo() {
    const arrayPath = this.videoP.file.split('/');
    console.log(arrayPath)
    arrayPath.splice(3, 1);

    return arrayPath.join('/');
  }

  getOverlayClass(activeClass: string, inactiveClass: string): any {
    // if (this.overlay === null) {
    //   return (!this.playing || this.isMouseMoving) ? activeClass : inactiveClass;
    // } else {
    //   return this.overlay ? activeClass : inactiveClass;
    // }
  }
}
