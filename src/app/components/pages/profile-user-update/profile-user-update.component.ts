import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {NotificationsService} from 'angular2-notifications';
import * as $ from 'jquery';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-profile-user-update',
  templateUrl: './profile-user-update.component.html',
  styleUrls: ['./profile-user-update.component.scss']
})
export class ProfileUserUpdateComponent implements OnInit {

  updateUserForm: FormGroup;
  updatePwdForm: FormGroup;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private notificationService: NotificationsService,
              private router: Router) {
    this.user = this.authService.getProfile();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.updateUserForm = this.formBuilder.group({
        firstname: [this.user.first_name],
        lastname: [this.user.last_name],
        email: [this.user.email, [Validators.required, Validators.email]],
        gender: [this.user.gender],
        group: ['t', [Validators.required]]
      });

    this.updatePwdForm = this.formBuilder.group({
        apassword: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]],
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
      const apassword = group.controls['apassword'];

      if (password.value !== null) {
        this.authService.authenticate(this.user.email, apassword.value).subscribe(
          (value) => {
          },
          (error) => {
            return apassword.setErrors({
              apiError: ['Ancien mot de passe non valide.']
            });
          }
        );
      }

      if (password.value !== confirmation.value) {
        return confirmation.setErrors({
          apiError: ['La confirmation n\'est pas identique au mot de passe.']
        });
      }
    };
  }

  onSubmitUpdateUser() {

    const user = {
      first_name: this.updateUserForm.get('firstname').value,
      last_name: this.updateUserForm.get('lastname').value,
      email: this.updateUserForm.get('email').value,
      gender: this.updateUserForm.get('gender').value,
    };

    this.userService.updateUser(user).subscribe(
      value => {
        this.notificationService.success(null, 'Modification du profile reussie');
        localStorage.setItem('userProfile', JSON.stringify(value));
      },
      err => {
        if (err.error.first_name) {
          this.updateUserForm.controls['firstname'].setErrors({'apiError': err.error.first_name});
        }
        if (err.error.last_name) {
          this.updateUserForm.controls['lastname'].setErrors({'apiError': err.error.last_name});
        }
        if (err.error.email) {
          this.updateUserForm.controls['email'].setErrors({'apiError': err.error.email});
        }
        if (err.error.gender) {
          this.updateUserForm.controls['gender'].setErrors({'apiError': err.error.gender});
        }
      },
      () => {
        window.location.reload();
      }
    );
  }

  onSubmitPwdUser() {
    const apassword = this.updatePwdForm.get('apassword').value;
    const password = this.updatePwdForm.get('password').value;
    const id = this.user.id;

    this.userService.changePassword(id, apassword, password).subscribe(
      value => {
        this.notificationService.success(null, 'Modification du mot de passe reussi');
      },
      err => {
        if (err.error.password) {
          this.updatePwdForm.controls['password'].setErrors({'apiError': err.error.password});
        }
      }
    );
  }

}
