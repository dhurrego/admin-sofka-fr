import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenDTO } from '../interfaces/tokendto';
import { Observable } from 'rxjs';

import { InicioSesionDTO } from '../interfaces/iniciosesiondto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = `${environment.baseUrl}/seguridad`

  constructor(private _http: HttpClient,
              private _router: Router) { }

  public login(inicioSesionDTO: InicioSesionDTO): Observable<TokenDTO> {
    return this._http.post<TokenDTO>(`${this._baseUrl}/acceder`, inicioSesionDTO);
  }

  public estaLogueado(): boolean {
    let token = localStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  public cerrarSesion() {
    localStorage.clear();
    this._router.navigate(['/auth/login']);
  }
}
