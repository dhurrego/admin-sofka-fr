import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/services/auth.service';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor(private _authService: AuthService,
              private _router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.validarLogin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.validarLogin();
  }

  private validarLogin() {
    if(!this._authService.estaLogueado()) {
      this._authService.cerrarSesion();
      return false;
    } else {
      const helper = new JwtHelperService();
      let token = localStorage.getItem(environment.TOKEN_NAME) || undefined;
      if(token && !helper.isTokenExpired(token)) {
        return true;
      } else {
        this._authService.cerrarSesion();
        return false;
      }
    }
  }
}
