import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { AdminService } from '../../services/admin-service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  message;
  isLogin;
  building=[];

  constructor(private auth: AuthService,
    private admin: AdminService) { this.isLogin = true}

  ngOnInit() {
    this.message = true;
    //this.admin.getAllBuildin().subscribe(res => {
    //  console.log(res);
    //})
    this.building = [
      {id: '1', address: {id:'1', street: 'dr. svetilava kasapinovica', number: '21', city: 'Novi Sad', zip: '21000'}},
      {id: '2', address: {
        id:'2', street: 'dr. svetilava kasapinovica', number: '22', city: 'Novi Sad', zip: '21000'
      }}
    ]
  }

  login() {
    this.auth.login_service(this.user).subscribe(resp => {
      this.message = resp;
    }, err => {
      console.log(err);
      this.message = false;
    });
  }

  onShowRegistration(event) {
    if(event === 'register') {
      this.isLogin = false;
    }
    if(event === 'login') {
      this.isLogin = true;
    }
  }

  onRegistration() {
    this.auth.registration_service(this.user).subscribe(res => {
      this.message = res;
    }, err => {
      console.log(err);
      this.message = false;
    })
  }
}
