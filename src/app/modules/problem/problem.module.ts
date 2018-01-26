import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ProblemService } from '../../services/problem-service/problem.service';
import { ProblemHomeComponent } from '../../components/problem/problem-home/problem-home.component';
import { ProblemPostingComponent } from '../../components/problem/problem-posting/problem-posting.component';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { CalendarModule, FileUploadModule, GalleriaModule, ConfirmDialogModule, DialogModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    SidebarModule,
    NavbarModule,
    CalendarModule,
    FileUploadModule,
    GalleriaModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [
    ProblemHomeComponent,
    ProblemPostingComponent,
  ],
  providers: [
    ProblemService,
    ConfirmationService
  ]
})
export class ProblemModule { }
