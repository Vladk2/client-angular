import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private user: any = {};

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('token'));

    localStorage.setItem('sidebar', 'user');
    localStorage.setItem('navbarTitle', this.user.username);
    localStorage.setItem('profile', 'true');
  }

}
