import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AnonymusGuard } from './guards/anonymus.guard';
import { TenantGuard } from './guards/tenant.guard';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeNewComponent } from './components/employee/employee-new/employee-new.component';

import { TenantRegistrationComponent } from './components/tenant/tenant-registration/tenant-registration.component';
import { TenantHomeComponent } from './components/tenant/tenant-home/tenant-home.component';

import { TenantSurveyComponent } from './components/tenant/tenant-survey/tenant-survey.component';

import { NotFoundComponent } from './components/not-found/not-found.component';

import { AdminNewBuildingComponent } from './components/admin/admin-new-building/admin-new-building.component';
import { AdminNewFirmComponent } from './components/admin/admin-new-firm/admin-new-firm.component';
import { AdminListUsersComponent } from './components/admin/admin-list-users/admin-list-users.component';
import { AdminListBuildingsComponent } from './components/admin/admin-list-buildings/admin-list-buildings.component';
import { AdminListFirmsComponent } from './components/admin/admin-list-firms/admin-list-firms.component';

import { ParliamentHomeComponent } from './components/parliament/parliament-home/parliament-home.component';

import { UserComponent } from './components/user/user.component';
import { ProblemHomeComponent } from './components/problem/problem-home/problem-home.component';
import { ProblemPostingComponent } from './components/problem/problem-posting/problem-posting.component';

import {VerificationComponent} from './components/profile-verification/verification/verification.component';
import {TenantApprovalComponent} from './components/tenant/tenant-approval/tenant-approval/tenant-approval.component';
import { EmployeeGuard } from './guards/employee.guard';



const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'supervisors/tenants/:username/buildings/:building/:apartmentNo',
    component: TenantApprovalComponent, canActivate: [AuthGuard]},
  { path: 'verify/:token', component: VerificationComponent },
  { path: 'login', component: LoginComponent, canActivate: [AnonymusGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [AnonymusGuard] },
  { path: 'profile', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'new_abode', component: TenantRegistrationComponent, canActivate: [AuthGuard] },
  {
    path: 'admin', canActivateChild: [AuthGuard], data: { expectedRole: 'ADMIN' },
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'lists', component: AdminHomeComponent },
      { path: 'building', component: AdminNewBuildingComponent },
      { path: 'firm', component: AdminNewFirmComponent },
      { path: 'users', component: AdminListUsersComponent },
      { path: 'buildings', component: AdminListBuildingsComponent },
      { path: 'firms', component: AdminListFirmsComponent }
    ]
  },

  {
    path: 'employee', canActivateChild: [AuthGuard], data: { expectedRole: 'EMPLOYEE' },
    children: [

      { path: ':id', canActivate: [EmployeeGuard], component: EmployeeHomeComponent },
      { path: ':id/list', canActivate: [EmployeeGuard], component: EmployeeListComponent },
      { path: ':id/problems', canActivate: [EmployeeGuard], component: ProblemHomeComponent },
      { path: ':id/new', canActivate: [EmployeeGuard], component: EmployeeNewComponent }
    ]
  },

  { path: 'tenant', canActivateChild: [AuthGuard], data: { expectedRole: 'TENANT'},
    children: [
      { path: ':id', canActivate: [TenantGuard], component: TenantHomeComponent },
      { path: ':id/problems', canActivate: [TenantGuard], component: ProblemHomeComponent },
      { path: ':id/problems/report', canActivate: [TenantGuard], component: ProblemPostingComponent },
      { path: ':id/parliament', canActivate: [TenantGuard], component: ParliamentHomeComponent },
      { path: ':id/surveys', canActivate: [TenantGuard], component: TenantSurveyComponent }

    ]
  },
  { path: '?', component: NotFoundComponent },
  { path: '**', redirectTo: '/%3F' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

