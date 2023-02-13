import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrarUsuarioDTO } from '../interfaces/registrarusuariodto';
import { Observable } from 'rxjs';
import { TokenDTO } from 'src/app/auth/interfaces/tokendto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private _baseUrl: string = `${environment.baseUrl}/seguridad`

  constructor(private _httpClient: HttpClient) { }

  public guardarUsuario(registrarUsuarioDTO: RegistrarUsuarioDTO): Observable<TokenDTO> {
    return this._httpClient.post<TokenDTO>(`${this._baseUrl}/usuarios`, registrarUsuarioDTO);
  }
}
