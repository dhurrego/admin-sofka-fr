import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ClienteDTO } from '../../interfaces/clientedto';
import { ClientesService } from '../../services/clientes.service';

import { AgregarClienteComponent } from './agregar-cliente.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('AgregarClienteComponent Comportamientos Guardar', () => {
  let component: AgregarClienteComponent;
  let fixture: ComponentFixture<AgregarClienteComponent>;
  let mockClientesService: jasmine.SpyObj<ClientesService>;

  const nit: string = '8908560652';
  const razonSocial: string = 'TEST';
  const clientDTO: ClienteDTO = { nit, razonSocial }

  beforeEach(async () => {
    mockClientesService = jasmine.createSpyObj(['guardarCliente', 'actualizarCliente', 'listarPorNit']);
    mockClientesService.guardarCliente.and.returnValue(of(clientDTO));
    mockClientesService.actualizarCliente.and.returnValue(of(clientDTO));
    mockClientesService.listarPorNit.and.returnValue(of(clientDTO));

    await TestBed.configureTestingModule({
      declarations: [ AgregarClienteComponent ],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatButtonModule,
        RouterTestingModule,
        MatDividerModule,
        BrowserAnimationsModule
      ],
      providers: [{
        provide: ClientesService,
        useValue: mockClientesService 
     }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente creado', () => {
    expect(component).toBeTruthy();
  });

  it('obtenerMensajeError cuando el error es requerido', () => {
    const mensajeError = component.obtenerMensajeError('nit');
    expect(mensajeError).toEqual('El campo es obligatorio');
  });

  it('obtenerMensajeError cuando el error es por formato invalido', () => {
    component.form.get('nit')?.setValue('ADASd123');

    const mensajeError = component.obtenerMensajeError('nit');

    expect(mensajeError).toEqual('El formato del campo es invalido');
  });

  it('obtenerMensajeError cuando el error es longitud menor a la permitida', () => {
    component.form.get('nit')?.setValue('1234567');

    const mensajeError = component.obtenerMensajeError('nit');

    expect(mensajeError).toEqual('El NIT debe ser de 10 digitos incluido el código de verificación');
  });

  it('obtenerMensajeError cuando el error es longitud mayor a la permitida', () => {
    component.form.get('nit')?.setValue('12345678901');

    const mensajeError = component.obtenerMensajeError('nit');

    expect(mensajeError).toEqual('El NIT debe ser de 10 digitos incluido el código de verificación');
  });

  it('obtenerMensajeError cuando longitud no es valida en un campo diferente a nit', () => {
    component.form.get('razonSocial')?.setErrors({ maxlength: true });

    const mensajeError = component.obtenerMensajeError('razonSocial');

    expect(mensajeError).toEqual('Tamaño del campo invalido');
  });

  it('obtenerMensajeError debe ser vacio cuando no esta en la lista de errores', () => {
    component.form.get('nit')?.setErrors({ ERROR: true });

    const mensajeError = component.obtenerMensajeError('nit');

    expect(mensajeError).toEqual('');
  });

  it('guardarOActualizarCliente debe guardar la informacion del cliente', () => {
    component.form.get('nit')?.setValue(nit);
    component.form.get('razonSocial')?.setValue(razonSocial);
    
    component.guardarOActualizarCliente();

    expect(component.form.get('nit')?.value).toBeNull();
    expect(component.form.get('razonSocial')?.value).toBeNull();
  });

});


describe('AgregarClienteComponent Comportamiento Editar', () => {
  let component: AgregarClienteComponent;
  let fixture: ComponentFixture<AgregarClienteComponent>;
  let mockClientesService: jasmine.SpyObj<ClientesService>;

  const nit: string = '8908560652';
  const razonSocial: string = 'TEST';
  const clientDTO: ClienteDTO = { nit, razonSocial }

  beforeEach(async () => {
    mockClientesService = jasmine.createSpyObj(['guardarCliente', 'actualizarCliente', 'listarPorNit']);
    mockClientesService.guardarCliente.and.returnValue(of(clientDTO));
    mockClientesService.actualizarCliente.and.returnValue(of(clientDTO));
    mockClientesService.listarPorNit.and.returnValue(of(clientDTO));

    await TestBed.configureTestingModule({
      declarations: [ AgregarClienteComponent ],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatButtonModule,
        RouterTestingModule,
        MatDividerModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: ClientesService,
          useValue: mockClientesService 
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              nit,
            }),
          },
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('guardarOActualizarCliente debe actualizar la informacion del cliente', () => {
    component.form.get('nit')?.setValue(nit);
    component.form.get('razonSocial')?.setValue(razonSocial);
    
    component.guardarOActualizarCliente();

    expect(component.form.get('nit')?.value).not.toBeNull();
    expect(component.form.get('razonSocial')?.value).not.toBeNull();
  });
});
