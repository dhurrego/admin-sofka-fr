import { TestBed } from '@angular/core/testing';

import { ClientesService } from './clientes.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ClienteDTO } from '../interfaces/clientedto';

describe('ClientesService', () => {
  let service: ClientesService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  const clienteDTO: ClienteDTO = { nit: '8992302', razonSocial: 'TEST'}

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj(['get', 'post', 'put']);
    mockHttpClient.get.and.returnValue(of([clienteDTO]));
    mockHttpClient.post.and.returnValue(of(clienteDTO));
    mockHttpClient.put.and.returnValue(of(clienteDTO));

    TestBed.configureTestingModule({
      imports: [ 
        HttpClientModule,
        MatSnackBarModule
      ],
      providers: [
        {provide: HttpClient, useValue: mockHttpClient}
      ]
    });
    service = TestBed.inject(ClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Llamando al metodo listarTodo', () => {
    service.listarTodos();
    expect(mockHttpClient.get).toHaveBeenCalled();
  });

  it('Llamando al metodo listarPorId', () => {
    service.listarPorNit('8950622654');
    expect(mockHttpClient.get).toHaveBeenCalled();
  });

  it('Llamando al metodo guardarCliente', () => {
    service.guardarCliente(clienteDTO);
    expect(mockHttpClient.post).toHaveBeenCalled();
  });

  it('Llamando al metodo actualizarCliente', () => {
    service.actualizarCliente(clienteDTO);
    expect(mockHttpClient.put).toHaveBeenCalled();
  });
});
