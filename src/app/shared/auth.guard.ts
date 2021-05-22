import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private auth: AuthService,
                      private router:Router ){

  }

  // canActivate():  boolean  {
  //   if(this.auth.isAuthenticated()){
  //     return true;
  //   }else{
  //     this.router.navigateByUrl('/user/login');
  //     return false;
  //   }
  // }

  canActivate() {
    const TOKEN =  this.auth.currentToken;
    const EXPIRED = this.auth.expired();
    if (TOKEN && EXPIRED) {
      return true;
    }

    this.router.navigateByUrl('/user/login');
    return false;
  }
  
}
