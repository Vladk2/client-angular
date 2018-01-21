import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AnonymusGuard } from './guards/anonymus.guard';
import { TenantGuard } from './guards/tenant.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { TenantHomeComponent } from './components/tenant/tenant-home/tenant-home.component';
import { TenantProblemComponent } from './components/tenant/tenant-problem/tenant-problem.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { AdminNewBuildingComponent } from './components/admin/admin-new-building/admin-new-building.component';
import { AdminNewFirmComponent } from './components/admin/admin-new-firm/admin-new-firm.component';
import { AdminListUsersComponent } from './components/admin/admin-list-users/admin-list-users.component';
import { AdminListBuildingsComponent } from './components/admin/admin-list-buildings/admin-list-buildings.component';
import { AdminListFirmsComponent } from './components/admin/admin-list-firms/admin-list-firms.component';

import { TenantRegistrationComponent } from './components/tenant/tenant-registration/tenant-registration.component';
import { ParliamentHomeComponent } from './components/parliament/parliament-home/parliament-home.component';
import { ParliamentAnnounceComponent } from './components/parliament/parliament-announce/parliament-announce.component';
import { ParliamentProposalsComponent } from './components/parliament/parliament-proposals/parliament-proposals.component';
import { ParliamentVotingComponent } from './components/parliament/parliament-voting/parliament-voting.component';
import { ParliamentRecordComponent } from './components/parliament/parliament-record/parliament-record.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [

{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
{ path: 'login', component: LoginComponent, canActivate: [AnonymusGuard]},
{ path: 'registration', component: RegistrationComponent, canActivate: [AnonymusGuard]},
{ path: 'profil', component: UserComponent, canActivate: [AuthGuard]},
{ path: 'new_abode', component: TenantRegistrationComponent, canActivate: [AuthGuard]},
{ path: 'admin', canActivateChild: [AuthGuard], data: { expectedRole: 'ADMIN'},
  children: [
    { path: '', component: AdminHomeComponent },
    { path: 'lists', component: AdminHomeComponent },
    { path: 'news/building', component: AdminNewBuildingComponent },
    { path: 'news/firm', component: AdminNewFirmComponent },
    { path: 'lists/users', component: AdminListUsersComponent },
    { path: 'lists/buildings', component: AdminListBuildingsComponent },
    { path: 'lists/firms', component: AdminListFirmsComponent }
  ]
},

  {
    path: 'employee', canActivateChild: [AuthGuard], data: {expectedRole: 'EMPLOYEE'},
    children: [
      {path: ':id', component: EmployeeHomeComponent}
    ]
  },

  {
    path: 'tenant', canActivateChild: [AuthGuard], data: {expectedRole: 'TENANT'},
    children: [
      {path: ':id', canActivate: [TenantGuard], component: TenantHomeComponent},
      {path: ':id/kvarovi', canActivate: [TenantGuard], component: TenantProblemComponent},
      {path: ':id/skupstina', canActivate: [TenantGuard], component: ParliamentHomeComponent}
    ]
  },
  {path: '?', component: NotFoundComponent},
  {path: '**', redirectTo: '/%3F'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
