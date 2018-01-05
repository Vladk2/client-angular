import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/home/admin.component';
import { HomeComponent } from './home/home.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { TenantHomeComponent } from './tenant/tenant-home/tenant-home.component';
import { SupervisroHomeComponent } from './supervisor/supervisro-home/supervisro-home.component';

const routes: Routes = [
{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
{ path: '', canActivateChild: [AuthGuard], data: { expectedRole: 'ADMIN'},
  children: [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: 'admin', component: AdminComponent },
    { path: 'admin/lists', component: AdminComponent },
    { path: 'admin/news', component: AdminComponent }
  ]
},

{ path: '', canActivateChild: [AuthGuard], data: { expectedRole: 'EMPLOYEE'},
  children: [
    { path: '', redirectTo: 'employee', pathMatch: 'full' },
    { path: 'employee', component: AdminComponent }
  ]
},

{ path: '', canActivateChild: [AuthGuard], data: { expectedRole: 'TENANT'},
  children: [
    { path: '', redirectTo: 'tenant', pathMatch: 'full' },
    { path: 'tenant', component: TenantHomeComponent }
  ]
},

{ path: '', canActivateChild: [AuthGuard], data: { expectedRole: 'SUPERVISOR'},
  children: [
    { path: '', redirectTo: 'supervisor', pathMatch: 'full' },
    { path: 'supervisor/:id', component: SupervisroHomeComponent },
    { path: 'supervisor/nesto/:id', component: SupervisroHomeComponent }
  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
