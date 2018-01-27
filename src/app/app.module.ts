
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule, DialogModule, FileUploadModule, GalleriaModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './guards/token.interceptor';

import { AuthGuard } from './guards/auth.guard';
import { AnonymusGuard } from './guards/anonymus.guard';
import { TenantGuard } from './guards/tenant.guard';

import { AuthService } from './services/auth-service/auth.service';
import { AdminService } from './services/admin-service/admin.service';
import { TenantService } from './services/tenant-service/tenant.service';
import { AlertService } from './services/alert-service/alert.service';

import { TokenService } from './guards/token.service';

import { UserService } from './services/user-service/user.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { TenantHomeComponent } from './components/tenant/tenant-home/tenant-home.component';
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AlertComponent } from './components/alert/alert.component';
import { AdminNewBuildingComponent } from './components/admin/admin-new-building/admin-new-building.component';
import { AdminNewFirmComponent } from './components/admin/admin-new-firm/admin-new-firm.component';
import { AdminListUsersComponent } from './components/admin/admin-list-users/admin-list-users.component';
import { AdminListBuildingsComponent } from './components/admin/admin-list-buildings/admin-list-buildings.component';
import { AdminListFirmsComponent } from './components/admin/admin-list-firms/admin-list-firms.component';
import { TenantRegistrationComponent } from './components/tenant/tenant-registration/tenant-registration.component';
import { UserComponent } from './components/user/user.component';

import { SurveyModule } from './modules/survey/survey.module';
import { ParliamentModule } from './modules/parliament/parliament.module';
import { ProblemModule } from './modules/problem/problem.module';
import {SupervisorService} from './services/supervisor-service/supervisor.service';
import { EmployeeGuard } from './guards/employee.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    HomeComponent,
    TenantHomeComponent,
    EmployeeHomeComponent,
    NotFoundComponent,
    RegistrationComponent,
    AlertComponent,
    AdminNewBuildingComponent,
    AdminNewFirmComponent,
    AdminListUsersComponent,
    AdminListBuildingsComponent,
    AdminListFirmsComponent,
    TenantRegistrationComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    SidebarModule,
    NavbarModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    FileUploadModule,
    GalleriaModule,
    SurveyModule,
    ParliamentModule,
    ProblemModule,
  ],
  providers: [
    AdminService,
    AuthGuard,
    AnonymusGuard,
    TenantGuard,
    EmployeeGuard,
    TokenService,
    TenantService,
    UserService,
    AuthService,
    AlertService,
    ConfirmationService,
    SupervisorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

