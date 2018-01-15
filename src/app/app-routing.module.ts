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
import { ParliamentHomeComponent } from './components/parliament/parliament-home/parliament-home.component';
import { ParliamentAnnounceComponent } from './components/parliament/parliament-announce/parliament-announce.component';
import { ParliamentProposalsComponent } from './components/parliament/parliament-proposals/parliament-proposals.component';
import { ParliamentVotingComponent } from './components/parliament/parliament-voting/parliament-voting.component';
import { ParliamentRecordComponent } from './components/parliament/parliament-record/parliament-record.component';

const routes: Routes = [

{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
{ path: 'login', component: LoginComponent, canActivate: [AnonymusGuard]},
{ path: 'registration', component: RegistrationComponent, canActivate: [AnonymusGuard]},
{ path: 'admin', canActivateChild: [AuthGuard], data: { expectedRole: 'ADMIN'},
  children: [
    { path: '', component: AdminHomeComponent },
    { path: 'lists', component: AdminHomeComponent },
    { path: 'news', component: AdminHomeComponent }
  ]
},

{ path: 'employee', canActivateChild: [AuthGuard], data: { expectedRole: 'EMPLOYEE'},
  children: [
    { path: ':id', component: EmployeeHomeComponent }
  ]
},

{ path: 'tenant', canActivateChild: [AuthGuard], data: { expectedRole: 'TENANT'},
  children: [
    { path: ':id', canActivate: [TenantGuard], component: TenantHomeComponent },
    { path: ':id/kvarovi', canActivate: [TenantGuard], component: TenantProblemComponent },
    { path: ':id/skupstina', canActivate: [TenantGuard], component: ParliamentHomeComponent }
  ]
},
{path: '?', component: NotFoundComponent},
{path: '**', redirectTo: '/%3F'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
