import {Component, EventEmitter, OnInit} from '@angular/core';
import {VideoService} from '../../../services/video.service';
import {NotificationsService} from 'angular2-notifications';
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadStatus} from 'ngx-uploader';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Genre} from '../../../models/video.model';
import { map } from 'rxjs/operators';
import {NgSelectConfig, NgSelectModule} from '@ng-select/ng-select';

@Component({
  selector: 'app-user-profile-videos-register',
  templateUrl: './user-profile-videos-register.component.html',
  styleUrls: ['./user-profile-videos-register.component.scss']
})
export class UserProfileVideosRegisterComponent implements OnInit {

  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  errors: string[];
  form2AddVideoForm: FormGroup;
  videos: object[];
  showFormVideo: boolean
  genres$: Observable<Genre[]>;

  constructor(
    private form2AddVideoBuilder: FormBuilder,
    private videoService: VideoService,
    private notificationService: NotificationsService,
    private config: NgSelectConfig
  ) {
    this.config.notFoundText = 'Video genre not found';

    this.options = {
      concurrency: 1,
      // allowedContentTypes: ['mp4'],
      maxUploads: 1
    };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    this.errors = [];

    this.videos = [];
    this.showFormVideo = false;
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      // if you want to start the upload directly
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.errors = [];
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'cancelled' || output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      this.errors.push(output.file.name + ' rejected.');
    } else if (output.type === 'done' && typeof output.file.response !== 'undefined') {

      if (output.file.response.hasOwnProperty('file') &&
        typeof output.file.response.file === 'object' ||
        output.file.responseStatus !== 201) {

        this.showFormVideo = false;
        this.errors.push(output.file.response.message);
        this.files = [];
        return;
      }

      this.videos.push(output.file.response.id);
      this.showFormVideo = true;
      this.initForm();
    }

    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
  }

  ngOnInit() {
    this.genres$ = this.videoService.getListGenres()
      .pipe(map(result => result.results));
  }

  initForm() {
    this.form2AddVideoForm = this.form2AddVideoBuilder.group({
      id: [this.videos[0], [Validators.required]],
      title: [null, [Validators.required]],
      active: ['0', [Validators.required]],
      description: [null],
      genres: [null],
    });
  }

  startUpload(): void {
    const event = this.videoService.createNewVideo();
    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
    this.files = [];
  }

  onSubmit() {
    const video = {
      id: this.form2AddVideoForm.get('id').value,
      title: this.form2AddVideoForm.get('title').value,
      is_actived: (this.form2AddVideoForm.get('active').value === '1') ?
        new Date : new Date('1960-01-01'),
      description: this.form2AddVideoForm.get('description').value,
      genres: this.form2AddVideoForm.get('genres').value,
    };

    console.log(video.genres)

    this.videoService.updateVideo(video, video.id).subscribe(
      value => {

      },
      error => {
        this.showFormVideo = true;
      },
      () => {
        this.showFormVideo = false;
        this.notificationService.success(null, 'Votre vidéo a été enregistrée');
        this.videos = [];
      }
    );
  }

}
