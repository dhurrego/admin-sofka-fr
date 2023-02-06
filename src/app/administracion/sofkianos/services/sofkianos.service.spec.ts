import { TestBed } from '@angular/core/testing';

import { SofkianosService } from './sofkianos.service';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SofkianoDTO } from '../interfaces/sofkianodto';
import { of } from 'rxjs';
import { RealizarAsignacionDTO } from '../interfaces/realizarasignaciondto';
import { RespuestaGenerica } from '../../../shared/interfaces/respuestagenerica';

describe('SofkianosService', () => {
  let service: SofkianosService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  const stringTest: string = 'TEST';
  const tipoIdentificacion: string = 'CC';
  const numeroIdentificacion: string = '123123';

  const sofkianoDTO: SofkianoDTO = {
    activo: true,
    direccion: stringTest,
    numeroIdentificacion,
    tipoIdentificacion,
    primerNombre: stringTest,
    primerApellido: stringTest
  };

  const respuestaGenerica: RespuestaGenerica = { respuesta: 'ok'}

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj(['get', 'post', 'put', 'patch', 'delete']);
    mockHttpClient.get.and.returnValue(of([sofkianoDTO]));
    mockHttpClient.post.and.returnValue(of(sofkianoDTO));
    mockHttpClient.put.and.returnValue(of(sofkianoDTO));
    mockHttpClient.patch.and.returnValue(of(respuestaGenerica));
    mockHttpClient.delete.and.returnValue(of(respuestaGenerica));

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule
      ],
      providers: [
        {provide: HttpClient, useValue: mockHttpClient}
      ]
    });
    service = TestBed.inject(SofkianosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Llamando al metodo listarTodo', () => {
    service.listarTodos();
    expect(mockHttpClient.get).toHaveBeenCalled();
  });

  it('Llamando al metodo listarPorId', () => {
    service.listarPorDni('cc13132123');
    expect(mockHttpClient.get).toHaveBeenCalled();
  });

  it('Llamando al metodo guardarSofkiano', () => {
    service.guardarSofkiano(sofkianoDTO);
    expect(mockHttpClient.post).toHaveBeenCalled();
  });

  it('Llamando al metodo actualizarSofkiano', () => {
    service.actualizarSofkiano(sofkianoDTO);
    expect(mockHttpClient.put).toHaveBeenCalled();
  });

  it('Llamando al metodo realizarAsignacion', () => {
    const asignacion: RealizarAsignacionDTO = { dniSofkiano: 'CC123123', nitCliente: '89505621'}
    service.realizarAsignacion(asignacion);
    expect(mockHttpClient.patch).toHaveBeenCalled();
  });

  it('Llamando al metodo retirarAsignacion', () => {
    service.retirarAsignacion('CC123123');
    expect(mockHttpClient.patch).toHaveBeenCalled();
  });

  it('Llamando al metodo activarSofkiano', () => {
    service.activarSofkiano('CC123123');
    expect(mockHttpClient.patch).toHaveBeenCalled();
  });

  it('Llamando al metodo inactivarSofkiano', () => {
    service.inactivarSofkiano('CC123123');
    expect(mockHttpClient.delete).toHaveBeenCalled();
  });
});
