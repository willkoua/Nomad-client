import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
