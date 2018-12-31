import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {NotificationsService} from 'angular2-notifications';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private notificationService: NotificationsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]]
    });
  }

  onSubmit() {
    const $btn_submit = $('#btn-submit-save-user');
    $btn_submit.attr('disabled', 'disabled');

    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.authService.authenticate(email, password).subscribe(
      (value) => {
        localStorage.setItem('token', value.token);
        // get user profile
        this.userService.getProfile().subscribe(
          data => {
            localStorage.setItem('userProfile', JSON.stringify(data));
            this.notificationService.success(null, 'Vous êtes connecté');
            this.router.navigate(['/index']);
          }
        );
      },
      (error) => {
        this.errorMessage = 'L\'email et/ou le mot de passe sont incorrect';
        $btn_submit.removeAttr('disabled');
      },
      () => {
        $btn_submit.removeAttr('disabled');
      }
    );
  }

}
