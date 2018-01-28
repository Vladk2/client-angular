import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';
import { AuthService } from '../../../services/auth-service/auth.service';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  user: User;

  constructor(private adminService: AdminService,
              private authService: AuthService) {
    this.user = new User();
  }

  ngOnInit() {
    localStorage.setItem('sidebar', 'admin');
    localStorage.setItem('navbarTitle', 'Početna');

    this.adminService.getProfile().subscribe(res => {
      this.user = res;
    });

  }

}
