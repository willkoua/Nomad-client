import { Component, OnInit } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private notificationService: NotificationsService,
    private router: Router
  ) {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    this.notificationService.success(null, 'Au revoir et à bientôt');
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
