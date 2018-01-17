import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './guards/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { NavbarModule } from './components/navbar/navbar.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { AuthService } from './services/auth-service/auth.service';
import { AdminService } from './services/admin-service/admin.service';
import { TenantService } from './services/tenant-service/tenant.service';
import { AlertService } from './services/alert-service/alert.service';
import { AuthGuard } from './guards/auth.guard';
import { AnonymusGuard } from './guards/anonymus.guard';
import { TenantGuard } from './guards/tenant.guard';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { TokenService } from './guards/token.service';
import { HomeComponent } from './components/home/home.component';
import { TenantHomeComponent } from './components/tenant/tenant-home/tenant-home.component';
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { TenantProblemComponent } from './components/tenant/tenant-problem/tenant-problem.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AlertComponent } from './components/alert/alert.component';
import { AdminNewBuildingComponent } from './components/admin/admin-new-building/admin-new-building.component';
import { AdminNewFirmComponent } from './components/admin/admin-new-firm/admin-new-firm.component';
import { AdminListUsersComponent } from './components/admin/admin-list-users/admin-list-users.component';
import { AdminListBuildingsComponent } from './components/admin/admin-list-buildings/admin-list-buildings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    HomeComponent,
    TenantHomeComponent,
    EmployeeHomeComponent,
    TenantProblemComponent,
    NotFoundComponent,
    RegistrationComponent,
    AlertComponent,
    AdminNewBuildingComponent,
    AdminNewFirmComponent,
    AdminListUsersComponent,
    AdminListBuildingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    SidebarModule,
    NavbarModule
  ],
  providers: [
    AdminService,
    AuthGuard,
    AnonymusGuard,
    TenantGuard,
    TokenService,
    TenantService,
    AuthService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
