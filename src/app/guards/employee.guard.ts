import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class EmployeeGuard implements CanActivate {

  private token: any;
  private attempted_url_id: any;
  constructor(private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.attempted_url_id = (state.url.split('/'))[2];
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'));
      for (const employee of this.token.employees) {
        if (employee.firm === this.attempted_url_id) {
          return true;
        }
      }

      this.router.navigate(['/?']);
      return false;
    }
    this.router.navigate(['/?']);
    return false;
  }
}
