import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';

@Component({
  selector: 'app-admin-list-buildings',
  templateUrl: './admin-list-buildings.component.html',
  styleUrls: ['./admin-list-buildings.component.scss']
})
export class AdminListBuildingsComponent implements OnInit {

  private buildings: any = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
  	this.adminService.getAllBuildings().subscribe(res => {
      console.log(res);
      this.buildings = res;
    })
  }

}
