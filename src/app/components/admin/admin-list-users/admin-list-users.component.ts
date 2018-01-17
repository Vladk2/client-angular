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
  progres;
  private currentTimeout: number;
  constructor( private adminService: AdminService) { this.messageAdd = false; this.mesageRemove = false; this.progres = false; }

  ngOnInit() {
  	
    this.adminService.getAllUser().subscribe(res => {
      this.users = res;
    })
  }

  onAddAdmin(event) {
  	this.adminService.addAdmin(event).subscribe(res =>{

      this.progres = true;

      this.currentTimeout = setTimeout(() => {
        this.adminService.getAllUser().subscribe(res => {
          this.users = res;
          this.messageAdd = true;
          this.mesageRemove = false;
          this.progres = false;
        })
      }, 1000)

  		
   	})
  }

  onRemoveAdmin(event) {
  	this.adminService.removeAdmin(event).subscribe(res =>{
  		this.progres = true;

      this.currentTimeout = setTimeout(() => {
        this.adminService.getAllUser().subscribe(res => {
          this.users = res;
          this.messageAdd = false;
          this.mesageRemove = true;
          this.progres = false;
        })
      }, 1000)
   	})
  }

}
