import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';

@Component({
  selector: 'app-admin-list-users',
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.scss']
})
export class AdminListUsersComponent implements OnInit {

  private users: any = [];
  private proba: any = [];
  messageAdd;
  mesageRemove; 
  constructor( private adminService: AdminService) { this.messageAdd = false; this.mesageRemove = false; }

  ngOnInit() {
  	
    this.adminService.getAllUser().subscribe(res => {
      console.log(res);
      this.users = res;
    })
  }

  onAddAdmin(event) {
  	this.adminService.addAdmin(event).subscribe(res =>{
  		console.log("dodao admina");
  		this.adminService.getAllUser().subscribe(res => {
	      console.log(res);
	      this.users = res;
	      this.messageAdd = true;
	      this.mesageRemove = false;
	    })
   	})
  }

  onRemoveAdmin(event) {
  	this.adminService.removeAdmin(event).subscribe(res =>{
  		console.log("uklonio admina");
  		this.adminService.getAllUser().subscribe(res => {
	      console.log(res);
	      this.users = res;
	      this.mesageRemove = true;
	      this.messageAdd = false;
	    })
   	})
  }

}
