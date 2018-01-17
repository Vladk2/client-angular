import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';

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
  constructor(private adminService: AdminService) { this.message = false; }

  ngOnInit() {
  	this.adminService.getAllUser().subscribe(res => {
      console.log(res);
      this.users = res;
    })
  }

  onAddFirm() {
  	let firms = {
  		firm_name: this.firm.firm_name,
  		address: this.address
  	} 
  	this.adminService.addFirm(firms, this.firm.user_id).subscribe(res =>{
  		console.log(res);
  		this.message = true;
  	})
  }
}
