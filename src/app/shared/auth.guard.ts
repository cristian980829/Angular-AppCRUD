import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Roles } from './models/user';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private auth: AuthService,
                      private router:Router ){
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const roles:Roles[]= route.data.roles;
    if(!roles && this.auth.isAuthenticated()){
      return true;
    }
    if(this.auth.hasRoles(roles)) {
      return true;
    }
    this.router.navigateByUrl('/user/login');
    return false;
  }

}
