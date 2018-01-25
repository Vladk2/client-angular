import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-new-building',
  templateUrl: './admin-new-building.component.html',
  styleUrls: ['./admin-new-building.component.scss']
})
export class AdminNewBuildingComponent implements OnInit {

  private addressDTO: any = {};
  message;
  private currentTimeout;
  constructor(private adminService: AdminService, private router: Router) {
    this.message = false;
  }

  ngOnInit() {
  }

  onAddBuilding() {
    const building = {
      addressDTO: this.addressDTO
    };
    this.adminService.addBuilding(building).subscribe(res => {
      this.message = true;

      this.currentTimeout = setTimeout(() => {
        this.router.navigate(['/admin/lists/buildings']);
      }, 1000);

    });
  }

}
