import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  
  private user: any = {};
  message;
  message1;

  constructor(private adminService: AdminService, private authService: AuthService) { this.message = false; this.message1 = false;}

  ngOnInit() {
    localStorage.setItem("sidebar", "admin");
    localStorage.setItem("navbarTitle", "Početna");

    this.adminService.getProfile().subscribe(res => {
      console.log(res);
      this.user = res;
    })

  }


  onUpdateInfo() {
  	let info = {
  		'name': this.user.name,
  		'last_name': this.user.last_name,
  		'email': this.user.email
  	}
  	this.adminService.updateInfo(info).subscribe(res => {
  		this.message = true;
  	})
  }

  onCredencial() {
  	let pass = {
  		'password': this.user.password
  	}
  	this.adminService.updatePassword(pass).subscribe(res =>{
  		this.authService.logout_service();
  		this.message1 = true;
  	})
  }

}
