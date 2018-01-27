import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TenantApprovalComponent } from '../../components/tenant/tenant-approval/tenant-approval/tenant-approval.component';
import { SupervisorService } from '../../services/supervisor-service/supervisor.service';
import { TenantService } from '../../services/tenant-service/tenant.service';

import { TenantHomeComponent } from '../../components/tenant/tenant-home/tenant-home.component';
import { TenantRegistrationComponent } from '../../components/tenant/tenant-registration/tenant-registration.component';
import { TenantGuard } from '../../guards/tenant.guard';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    NavbarModule,
    FormsModule,
    BrowserModule
  ],
  declarations: [
    TenantHomeComponent,
    TenantRegistrationComponent,
    TenantApprovalComponent
  ],
  providers: [
    TenantService,
    SupervisorService,
    TenantGuard,
  ]
})
export class TenantModule { }
