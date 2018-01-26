import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin-service/admin.service';
import {SupervisorService} from '../../../services/supervisor-service/supervisor.service';
import { Building } from '../../../models/building/building.model';
import { Tenant } from '../../../models/user/tenant.model';

@Component({
  selector: 'app-admin-list-buildings',
  templateUrl: './admin-list-buildings.component.html',
  styleUrls: ['./admin-list-buildings.component.scss']
})
export class AdminListBuildingsComponent implements OnInit {

  private tenantsModal = false;

  private buildings: Building[];
  private tenants: Tenant[];
  constructor(private adminService: AdminService,
              private supervisorService: SupervisorService) {
  }

  ngOnInit() {
    this.adminService.getAllBuildings().subscribe(res => {
      this.buildings = res;
    });
  }

  openTenantsModal(buildingId) {
    this.adminService.getTenantsByBuilding(buildingId).subscribe(res => {
      this.tenants = res;
      this.tenantsModal = true;
    });
  }

  hideModal() {
    this.tenantsModal = false;
  }

  makeSupervisor(tenantId, buildingId) {
    this.adminService.makeSupervisor(tenantId, buildingId).subscribe(res => {
      this.adminService.getTenantsByBuilding(buildingId).subscribe(resp => {
        this.tenants = resp;
      });
    });
  }

  removeSupervisor(supervisorId, buildingId) {
    this.supervisorService.removeSupervisor(supervisorId).subscribe(res => {
      this.adminService.getTenantsByBuilding(buildingId).subscribe(resp => {
        this.tenants = resp;
      });
    });
  }

}
