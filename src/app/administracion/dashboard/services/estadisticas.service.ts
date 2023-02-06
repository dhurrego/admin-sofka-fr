import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ConsolidadoAsignacionDTO } from '../interfaces/consolidadoasignaciondto';
import { CantidadCambiosEstadoSofkianoDTO } from '../interfaces/cantidadcambiosestadossofkianos';
import { CantidadCambiosAsignacionesDTO } from '../interfaces/cantidadcambiosasignaciones';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private _urlSofkianos: string = `${environment.baseUrl}`;

  constructor(private _http: HttpClient) { }

  public consolidadoAsignacion(): Observable<ConsolidadoAsignacionDTO>{
    return this._http.get<ConsolidadoAsignacionDTO>(`${ this._urlSofkianos }/personas/sofkianos/consolidado-asignacion`);
  }

  public consultarCambiosEstados(fechaInicial: string, fechaFinal: string): Observable<CantidadCambiosEstadoSofkianoDTO>{
    const params = new HttpParams()
      .set('fechaInicial', fechaInicial)
      .set('fechaFinal', fechaFinal);

    return this._http.get<CantidadCambiosEstadoSofkianoDTO>(`${ this._urlSofkianos }/estadisticas/cambios-estados-sofkianos`, { params });
  }

  public consultarCambiosAsignaciones(fechaInicial: string, fechaFinal: string): Observable<CantidadCambiosAsignacionesDTO[]>{
    const params = new HttpParams()
      .set('fechaInicial', fechaInicial)
      .set('fechaFinal', fechaFinal);

    return this._http.get<CantidadCambiosAsignacionesDTO[]>(`${ this._urlSofkianos }/estadisticas/cambios-asignaciones`, { params });
  }
}
