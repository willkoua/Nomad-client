import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  errors: string;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthService,
              private router: Router) {
    this.forgotForm = this.formBuilder.group(
      {
        email: null,
      }
    );
  }

  resetPassword(form: FormGroup) {
    if ( form.valid ) {
      this.authenticationService.resetPassword(form.value['email']).subscribe(
        data => {
          console.log('success');
          this.router.navigate(['/forgot-password/confirmation']);
        },
        err => {
          if (err.error.non_field_errors) {
            this.errors = err.error.non_field_errors;
            console.log(this.errors);
          }
          if (err.error.email) {
            this.forgotForm.controls['email'].setErrors({
              apiError: err.error.email
            });
          }
        }
      );
    }
  }

  ngOnInit() {
  }

}
