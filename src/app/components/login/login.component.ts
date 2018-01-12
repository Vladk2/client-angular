import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private user: any = {};
  private message;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.message = true;
   
  }

  login() {
    this.auth.login_service(this.user).subscribe(resp => {
      this.message = resp;
    }, err => {
      console.log(err);
      this.message = false;
    });
  }

 
}
