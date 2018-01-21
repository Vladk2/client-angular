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
  private password: any = {};

  private display: boolean = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertService: AlertService,
              private router: Router) {
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
      alert('Uspešno ste izmenili nalog.');
    }, error => {
      this.alertService.error('Email adresa je već zauzeta.');
      this.router.navigate(['/profile']);
    });
  }

  updatePassword() {
    if (this.password.pw === this.password.re_pw) {
      this.userService.updatePassword({'password': this.password.pw}).subscribe(resp => {
        this.hideDialog();
        alert('Uspešno ste izmenili nalog.');
      }, error => {
        alert('Greška !');
      });
    } else {
      alert('Lozinke se ne poklapaju.');
    }
  }

  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }

}
