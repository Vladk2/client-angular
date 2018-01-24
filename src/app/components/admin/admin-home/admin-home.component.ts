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

  constructor(private adminService: AdminService, private authService: AuthService) {
    this.message = false; this.message1 = false;
  }

  ngOnInit() {
    localStorage.setItem('sidebar', 'admin');
    localStorage.setItem('navbarTitle', 'Početna');

    this.adminService.getProfile().subscribe(res => {
      this.user = res;
    });

  }

}
