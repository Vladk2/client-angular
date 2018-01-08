import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  private token: any;
  private loggedTenants: any[]; 
  private otherRoles: any;  // other roles: admin or employee
  private username: String; 

  constructor(private authService: AuthService) { }

  
  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.loggedTenants = this.token.tenants;
    this.otherRoles = this.token.roles;
    this.username = this.token.username;
    console.log(this.loggedTenants);
    console.log(this.otherRoles);
    console.log(this.username);
    
  }



  logout() {
    this.authService.logout_service();
  }

}
