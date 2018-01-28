import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';
import { Router } from '@angular/router';
import { Address } from '../../../models/address/address.model';

@Component({
  selector: 'app-admin-new-building',
  templateUrl: './admin-new-building.component.html',
  styleUrls: ['./admin-new-building.component.scss']
})
export class AdminNewBuildingComponent implements OnInit {

  addressDTO: Address;
  message;
  private currentTimeout;
  constructor(private adminService: AdminService, private router: Router) {
    this.message = false;
    this.addressDTO = new Address();
  }

  ngOnInit() {
  }

  onAddBuilding() {
    const building = {
      addressDTO: this.addressDTO
    };
    this.adminService.addBuilding(building).subscribe(res => {
      this.message = true;

      setTimeout(() => {
        this.router.navigate(['/admin/buildings']);
      }, 1000);

    });
  }

}
