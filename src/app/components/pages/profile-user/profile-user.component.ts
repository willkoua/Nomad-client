import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import * as $ from 'jquery';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getProfile();
  }

}
