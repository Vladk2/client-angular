import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service/auth.service';
import {UserService} from '../../services/user-service/user.service';
import {AlertService} from '../../services/alert-service/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private user: any = {};

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    localStorage.setItem('sidebar', 'user');
    this.userService.get().subscribe(res => {
      this.user = res;
      localStorage.setItem('navbarTitle', this.user.username);
    });
  }

  updateProfile() {
    this.userService.update(this.user).subscribe(res => {
    }, error => {
      this.alertService.error('Email already taken.');
      this.router.navigate('/profile');
    });
  }
}
