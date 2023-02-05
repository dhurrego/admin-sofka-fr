import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ClienteDTO } from '../interfaces/clientedto';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private _baseUrl: string = `${environment.baseUrl}/clientes`;

  constructor(private _http: HttpClient) { }

  listarTodos(): Observable<ClienteDTO[]>{
    return this._http.get<ClienteDTO[]>(`${ this._baseUrl }`);
  }

  listarPorNit(nit: string): Observable<ClienteDTO>{
    return this._http.get<ClienteDTO>(`${ this._baseUrl }/${nit}`);
  }

  guardarCliente(clienteDTO: ClienteDTO): Observable<ClienteDTO>{
    return this._http.post<ClienteDTO>(`${ this._baseUrl }`, clienteDTO);
  }

  actualizarCliente(clienteDTO: ClienteDTO): Observable<ClienteDTO>{
    return this._http.put<ClienteDTO>(`${ this._baseUrl }`, clienteDTO);
  }
}
