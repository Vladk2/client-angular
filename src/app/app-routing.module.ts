import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/home/admin.component';

const routes: Routes = [
	{ path: '', redirectTo: '', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'admin', canActivate: [AdminGuard],
	  children: [
	  	{ path: '', redirectTo: 'admin', pathMatch: 'full' },
	  	{ path: '', component: AdminComponent }
	  ]
	}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
