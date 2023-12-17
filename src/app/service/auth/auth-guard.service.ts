import { Injectable, inject } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs'; // Import the 'Observable' type from the 'rxjs' package

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }
  
    canActivate(route: ActivatedRouteSnapshot) {
      const expectedRole = route.data['expectedRole'];
      const accountRole = sessionStorage.getItem('role');
      if (accountRole == expectedRole) {
        console.log('You are allowed to access this URL');
        return true;
      }
      console.log('You are not allowed to access this URL')
      this.router.navigate(['/login']);
      return false;
    }
}