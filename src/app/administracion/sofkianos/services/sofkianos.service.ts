import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaGenerica } from 'src/app/shared/interfaces/respuestagenerica';

import { environment } from 'src/environments/environment';
import { RealizarAsignacionDTO } from '../interfaces/realizarasignaciondto';

import { SofkianoDTO } from '../interfaces/sofkianodto';

@Injectable({
  providedIn: 'root'
})
export class SofkianosService {

  private _baseUrl: string = `${environment.baseUrl}/sofkianos`;

  constructor(private _http: HttpClient) { }

  listarTodos(): Observable<SofkianoDTO[]>{
    return this._http.get<SofkianoDTO[]>(`${ this._baseUrl }`);
  }

  listarPorDni(dni: string): Observable<SofkianoDTO>{
    return this._http.get<SofkianoDTO>(`${ this._baseUrl }/${dni}`);
  }

  guardarSofkiano(sofkianoDTO: SofkianoDTO): Observable<SofkianoDTO>{
    return this._http.post<SofkianoDTO>(`${ this._baseUrl }`, sofkianoDTO);
  }

  actualizarSofkiano(sofkianoDTO: SofkianoDTO): Observable<SofkianoDTO>{
    return this._http.put<SofkianoDTO>(`${ this._baseUrl }`, sofkianoDTO);
  }

  realizarAsignacion(realizarAsignacionDTO: RealizarAsignacionDTO): Observable<RespuestaGenerica>{
    return this._http.patch<RespuestaGenerica>(`${ this._baseUrl }/asignar-cliente`, realizarAsignacionDTO);
  }

  retirarAsignacion(dni: string): Observable<RespuestaGenerica>{
    return this._http.patch<RespuestaGenerica>(`${ this._baseUrl }/retirar-asignacion/${dni}`, {});
  }

  activarSofkiano(dni: string): Observable<RespuestaGenerica>{
    return this._http.patch<RespuestaGenerica>(`${ this._baseUrl }/activar/${dni}`, {});
  }

  inactivarSofkiano(dni: string): Observable<RespuestaGenerica>{
    return this._http.delete<RespuestaGenerica>(`${ this._baseUrl }/inactivar/${dni}`);
  }
}
