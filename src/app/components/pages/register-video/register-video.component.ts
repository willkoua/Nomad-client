import { Component, OnInit, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {NotificationsService} from 'angular2-notifications';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { VideoService} from '../../../services/video.service';

@Component({
  selector: 'app-register-video',
  templateUrl: './register-video.component.html',
  styleUrls: ['./register-video.component.scss']
})
export class RegisterVideoComponent implements OnInit {

  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  errors: string[];
  form2AddVideoForm: FormGroup;
  videos: object[];
  showFormVideo: boolean

  constructor(
    private form2AddVideoBuilder: FormBuilder,
    private videoService: VideoService,
    private notificationService: NotificationsService,
    private router: Router
  ) {

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

  ngOnInit() {}

  initForm() {
    this.form2AddVideoForm = this.form2AddVideoBuilder.group({
      id: [this.videos[0], [Validators.required]],
      title: [null, [Validators.required]],
      description: [null],
    });
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
        output.file.responseStatus === 400) {

        this.showFormVideo = false;
        this.errors.push(output.file.name + ' ' + output.file.response);
        this.files = [];
        // return;
      } else {
        this.videos.push(output.file.response.id);
        this.showFormVideo = true;
        this.initForm();
      }
    }

    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
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
      description: this.form2AddVideoForm.get('description').value
    };

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
      });
  }
}
