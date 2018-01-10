import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable()
export class AnonymusGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) { }

  // Doing just opposite of AuthGuard
  canActivate() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
