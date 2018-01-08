import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { TenantHomeComponent } from './components/tenant/tenant-home/tenant-home.component';
import { TenantProblemComponent } from './components/tenant/tenant-problem/tenant-problem.component';

const routes: Routes = [
{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
{ path: '', canActivateChild: [AuthGuard], data: { expectedRole: 'ADMIN'},
  children: [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: 'admin', component: AdminHomeComponent },
    { path: 'admin/lists', component: AdminHomeComponent },
    { path: 'admin/news', component: AdminHomeComponent }
  ]
},

{ path: '', canActivateChild: [AuthGuard], data: { expectedRole: 'EMPLOYEE'},
  children: [
    { path: '', redirectTo: 'employee', pathMatch: 'full' },
    { path: 'employee', component: EmployeeHomeComponent }
  ]
},

{ path: '', canActivateChild: [AuthGuard], data: { expectedRole: 'TENANT'},
  children: [
    { path: '', redirectTo: 'tenant', pathMatch: 'full' },
    { path: 'tenant/:id', component: TenantHomeComponent },
    { path: 'tenant/:id/kvarovi', component: TenantProblemComponent }
  ]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
