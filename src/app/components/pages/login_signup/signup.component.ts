import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {NotificationsService} from 'angular2-notifications';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      firstname: [null],
      lastname: [null],
      email: [null, [Validators.required, Validators.email]],
      gender: [null],
      group: ['t', [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]],
      confirmation: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]]
    },
      {validator: [
          this.confirmationValidator(),
        ]});
  }

  confirmationValidator() {
    return (group: FormGroup) => {

      const password = group.controls['password'];
      const confirmation = group.controls['confirmation'];

      if (password.value !== confirmation.value) {
        return confirmation.setErrors({
          apiError: ['La confirmation n\'est pas identique au mot de passe.']
        });
      }
    };
  }

  onSubmit() {
    const $btn_submit = $('#btn-submit-save-user');
    $btn_submit.attr('disabled', 'disabled');

    const user = {
      // The username has been removed because it is not useful.
      // So username = email
      username: this.signupForm.get('email').value,
      first_name: this.signupForm.get('firstname').value,
      last_name: this.signupForm.get('lastname').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      gender: this.signupForm.get('gender').value,
      group: this.signupForm.get('group').value,
    };

    this.authService.createNewUser(user).subscribe(
      value => {
        this.notificationService.success('Enregistrement reussi', value.detail);
      },
      err => {
        if (err.error.first_name) {
          this.signupForm.controls['firstname'].setErrors({'apiError': err.error.first_name});
        }
        if (err.error.last_name) {
          this.signupForm.controls['lastname'].setErrors({'apiError': err.error.last_name});
        }
        if (err.error.email) {
          this.signupForm.controls['email'].setErrors({'apiError': err.error.email});
        }
        if (err.error.password) {
          this.signupForm.controls['password'].setErrors({'apiError': err.error.password});
        }
        if (err.error.confirmation) {
          this.signupForm.controls['gender'].setErrors({'apiError': err.error.gender});
        }
        if (err.error.gender) {
          this.signupForm.controls['gender'].setErrors({'apiError': err.error.gender});
        }
        $btn_submit.removeAttr('disabled');
      },
      () => {
        $btn_submit.removeAttr('disabled');
        this.router.navigate(['/']);
      }
    );
  }

}
