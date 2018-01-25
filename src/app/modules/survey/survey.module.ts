import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantSurveyComponent } from '../../components/tenant/tenant-survey/tenant-survey.component';
import { TenantService } from '../../services/tenant-service/tenant.service';

import { ChartModule, DialogModule, ConfirmDialogModule } from 'primeng/primeng';

import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SurveyService } from '../../services/survey-service/survey.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ChartModule,
    ConfirmDialogModule,
    SidebarModule,
    NavbarModule,
    DialogModule,
  ],
  declarations: [
    TenantSurveyComponent
  ],
  providers: [
    TenantService,
    SurveyService
  ]
})
export class SurveyModule { }
