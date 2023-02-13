import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { SnackbarDefectoService } from 'src/app/shared/services/snackbar/snackbar-defecto.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosGuard implements CanActivate {

  constructor(private _snackBar: SnackbarDefectoService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const helper = new JwtHelperService();
    let token = localStorage.getItem(environment.TOKEN_NAME) || undefined;
    if(token) {
      const { rol } = helper.decodeToken(token);
      
      if(rol != 'ADMINISTRADOR') {
        this._snackBar.abrirMensajeEmergente('Usted no esta autorizado para ingresar a esa opción');
      }
      
      return rol == 'ADMINISTRADOR';
    } else {
      this._snackBar.abrirMensajeEmergente('Usted no esta autorizado para ingresar a esa opción');
      return false;
    }
  }
  
}
