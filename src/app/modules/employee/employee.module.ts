import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule, ConfirmDialogModule } from 'primeng/primeng';

import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FormsModule } from '@angular/forms';

import { EmployeeHomeComponent } from '../../components/employee/employee-home/employee-home.component';
import { EmployeeListComponent } from '../../components/employee/employee-list/employee-list.component';
import { EmployeeNewComponent } from '../../components/employee/employee-new/employee-new.component';

import { EmployeeService } from '../../services/employee/employee.service';

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
    EmployeeHomeComponent,
    EmployeeListComponent,
    EmployeeNewComponent
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeModule { }
