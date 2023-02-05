import { TestBed } from '@angular/core/testing';

import { EstadisticasService } from './estadisticas.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ConsolidadoAsignacionDTO } from '../interfaces/consolidadoasignaciondto';

describe('EstadisticasService', () => {
  let service: EstadisticasService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj(['get']);
    mockHttpClient.get.and.returnValue(of({ conAsignacion: 0, sinAsignacion: 0, totalSofkianos: 0} as ConsolidadoAsignacionDTO));

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule
      ],
      providers: [
        {provide: HttpClient, useValue: mockHttpClient}
      ]
    });
    service = TestBed.inject(EstadisticasService);
  });

  it('Se deberia crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Se deberia llamar al servicio consolidadoAsignacion', () => {
    service.consolidadoAsignacion();
    expect(mockHttpClient.get).toHaveBeenCalled();
  });
});
