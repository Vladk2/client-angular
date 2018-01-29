import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule, ConfirmDialogModule } from 'primeng/primeng';

import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FormsModule } from '@angular/forms';

import { AdminHomeComponent } from '../../components/admin/admin-home/admin-home.component';
import { AdminNewBuildingComponent } from '../../components/admin/admin-new-building/admin-new-building.component';
import { AdminNewFirmComponent } from '../../components/admin/admin-new-firm/admin-new-firm.component';
import { AdminListUsersComponent } from '../../components/admin/admin-list-users/admin-list-users.component';
import { AdminListBuildingsComponent } from '../../components/admin/admin-list-buildings/admin-list-buildings.component';
import { AdminListFirmsComponent } from '../../components/admin/admin-list-firms/admin-list-firms.component';
import { AdminRegistrationComponent } from '../../components/admin/admin-registration/admin-registration.component';

import { AdminService } from '../../services/admin-service/admin.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    SidebarModule,
    NavbarModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminNewBuildingComponent,
    AdminNewFirmComponent,
    AdminListUsersComponent,
    AdminListBuildingsComponent,
    AdminListFirmsComponent,
    AdminRegistrationComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
