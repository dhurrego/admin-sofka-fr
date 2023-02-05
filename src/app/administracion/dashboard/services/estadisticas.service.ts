import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ConsolidadoAsignacionDTO } from '../interfaces/consolidadoasignaciondto';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private _urlSofkianos: string = `${environment.baseUrl}/sofkianos`;

  constructor(private _http: HttpClient) { }

  public consolidadoAsignacion(): Observable<ConsolidadoAsignacionDTO>{
    return this._http.get<ConsolidadoAsignacionDTO>(`${ this._urlSofkianos }/consolidado-asignacion`);
  }
}
