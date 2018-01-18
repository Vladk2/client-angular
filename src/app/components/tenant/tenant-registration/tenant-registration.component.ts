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

  constructor(private authService: AuthService,
              private router: Router,
              private tenantService: TenantService) {
  }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('token')).username;
    this.authService.getAllBuildings().subscribe(res => {
      this.buildings = res;
    });
  }

  registerNewAbode() {
    this.tenantService.createNewTenant(this.abode).subscribe(res => {
      alert('Vas zahtev je prihvacen.');
      this.router.navigate(['/']);
    }, error => {
        if (error.status === 406) {
          alert('You already live in this apartment.');
        } else {
          this.router.navigate(['/login']);
        }
    });
  }

}
