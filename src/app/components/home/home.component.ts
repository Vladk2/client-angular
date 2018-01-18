import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {TenantService} from '../../services/tenant-service/tenant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private loggedTenants: any[];
  private userRoles: any;  // roles: admin, employee, tenant
  private username: String;
  firms: any[];
  progress;

  constructor(private authService: AuthService,
              private tenantService: TenantService) {
  }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('token'));
    this.userRoles = token.roles;
    this.username = token.username;
    if (this.userRoles.employee !== '') {
      this.progress = true;
      this.authService.findFirm().subscribe(res => {
        console.log(res);
        this.firms = res;
        this.progress = false;
      });
    }

    if (this.userRoles.tenant !== '') {
      this.progress = true;
      this.tenantService.getUsersTenants().subscribe(res => {
        console.log(res);
        this.loggedTenants = res;
        this.progress = false;
      });
    }
    console.log(this.loggedTenants);
    console.log(this.userRoles);
    console.log(this.username);

  }

  logout() {
    this.authService.logout_service();
  }

}
