import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-layout',
  template: `
    <div class="container-fluid">
        <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['login-layout.component.scss'],
})
export class LoginLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.getProfile()) {
      this.router.navigate(['']);
    }
  }

}
