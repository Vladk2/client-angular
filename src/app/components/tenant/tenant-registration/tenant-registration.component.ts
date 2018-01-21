import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {TenantService} from '../../../services/tenant-service/tenant.service';

@Component({
  selector: 'app-tenant-registration',
  templateUrl: './tenant-registration.component.html',
  styleUrls: ['./tenant-registration.component.scss']
})
export class TenantRegistrationComponent implements OnInit {

  private username: String;
  private abode: any = {};
  private buildings: any = [];

  private messageSuccess;
  private messageWarning;

  constructor(private authService: AuthService,
              private router: Router,
              private tenantService: TenantService) {
    this.messageSuccess = false;
    this.messageWarning = false;
  }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('token')).username;
    this.authService.getAllBuildings().subscribe(res => {
      this.buildings = res;
    });
  }

  registerNewAbode() {
    this.tenantService.createNewTenant(this.abode).subscribe(res => {
      this.messageSuccess = true;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 7000);
    }, error => {
        if (error.status === 406) {
          this.messageWarning = true;
        } else {
          this.router.navigate(['/login']);
        }
    });
  }

}
