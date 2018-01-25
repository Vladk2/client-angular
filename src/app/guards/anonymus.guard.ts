import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AnonymusGuard implements CanActivate {
  
  constructor(private router: Router) { }

  // Doing just opposite of AuthGuard
  canActivate() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
