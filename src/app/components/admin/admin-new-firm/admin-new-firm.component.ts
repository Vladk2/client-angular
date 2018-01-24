import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin-service/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-new-firm',
  templateUrl: './admin-new-firm.component.html',
  styleUrls: ['./admin-new-firm.component.scss']
})
export class AdminNewFirmComponent implements OnInit {

  private address: any = {};
  private firm: any = {};
  private users: any = [];
  message;
  private currentTimeout;
  constructor(private adminService: AdminService, private router: Router) {
    this.message = false;
  }

  ngOnInit() {
    this.adminService.getAllUser().subscribe(res => {
      this.users = res;
    });
  }

  onAddFirm() {
    const firms = {
      firm_name: this.firm.firm_name,
      address: this.address
    };
    this.adminService.addFirm(firms, this.firm.user_id).subscribe(res => {
      this.message = true;

      this.currentTimeout = setTimeout(() => {
        this.router.navigate(['/admin/lists/firms']);
      }, 1000);
    });
  }
}
