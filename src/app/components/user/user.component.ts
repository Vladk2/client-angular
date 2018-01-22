import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth-service/auth.service';
import { UserService } from '../../services/user-service/user.service';
import { AlertService } from '../../services/alert-service/alert.service';

import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private user: any = {};
  private password: any = {};

  private messageSuccess;
  private messageWarningEmail;
  private messageWarningPassword;
  private display;

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertService: AlertService,
              private confirmationService: ConfirmationService) {

    this.messageSuccess = false;
    this.messageWarningEmail = false;
    this.messageWarningPassword = false;
    this.display = false;
  }

  ngOnInit() {
    localStorage.setItem('sidebar', 'user');

    this.password['pw'] = '';
    this.password['re_pw'] = '';

    this.userService.get().subscribe(res => {
      this.user = res;
      localStorage.setItem('navbarTitle', this.user.username);
    });
  }

  update() {
    this.userService.update(this.user).subscribe(res => {
      this.resetMessageDivs();

      this.messageSuccess = true;
    }, error => {
      this.resetMessageDivs();

      this.messageWarningEmail = true;
    });
  }

  updatePassword() {
    if (this.password.pw === this.password.re_pw) {
      this.userService.updatePassword({ 'password': this.password.pw }).subscribe(resp => {
        this.hideDialog();

        this.resetMessageDivs();

        this.messageSuccess = true;
      }, error => {
        alert('Greška !');
      });
    } else {
      this.resetMessageDivs();
      this.messageWarningPassword = true;
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Da li ste sigurni da želite da obrišete svoj nalog?',
      header: 'Potvrda',
      icon: 'fa fa-question-circle'
    });
  }

  deleteAccount() {
    this.userService.destroy().subscribe(res => {
      this.authService.logout_service();
    });
  }

  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }

  private resetMessageDivs() {
    this.messageSuccess = false;
    this.messageWarningPassword = false;
    this.messageWarningEmail = false;
  }

}
