import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { AdminGuard } from './guards/admin.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'app';

  constructor(private adminGuard: AdminGuard) { }

  ngOnInit() { console.log(this.adminGuard.canActivate()) }

  isLoginAdmin() {
  	return this.adminGuard.canActivate();
  }

  isLoginTenant() {
    return false;
  }
}
