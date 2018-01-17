import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';


@Component({
  selector: 'app-admin-new-building',
  templateUrl: './admin-new-building.component.html',
  styleUrls: ['./admin-new-building.component.scss']
})
export class AdminNewBuildingComponent implements OnInit {

  private addressDTO: any = {};
  message; 
  constructor(private adminService: AdminService) { this.message = false; }

  ngOnInit() {
  }

  onAddBuilding() {
  	let building = {
  		addressDTO: this.addressDTO
  	}
  	this.adminService.addBuilding(building).subscribe(res => {
      console.log(res);
      this.message = true;
    })
  }

}
