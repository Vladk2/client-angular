import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin-service/admin.service';
import {Router} from '@angular/router';
//import {ConfirmationService} from 'primeng/primeng';

import { User } from '../../../models/user/user.model';
import { Firm } from '../../../models/firm/firm.model';
import { Address } from '../../../models/address/address.model';

@Component({
  selector: 'app-admin-new-firm',
  templateUrl: './admin-new-firm.component.html',
  styleUrls: ['./admin-new-firm.component.scss']
})
export class AdminNewFirmComponent implements OnInit {

  address: Address;
  firm: Firm;
  users: User[];
  user_id;

  message;
  showModal;
  currentTimeout;
  constructor(private adminService: AdminService,
              private router: Router) {
    this.message = false;
    this.showModal = false;
    this.firm = new Firm();
    this.address = new Address();
  }

  ngOnInit() {
    localStorage.setItem('sidebar', 'admin');
    localStorage.setItem('navbarTitle', 'Dodavanje firme');
    this.adminService.getAllUser().subscribe(res => {
      this.users = res;
    });
  }

  onAddFirm() {
    const firms = {
      firm_name: this.firm.firm_name,
      address: this.address
    };
    this.adminService.addFirm(firms, this.user_id).subscribe(res => {
      this.message = true;

      this.currentTimeout = setTimeout(() => {
        this.router.navigate(['/admin/firms']);
      }, 1000);
    });
  }

  openDialogAddUser() {
    this.showModal = true;

  }

}
