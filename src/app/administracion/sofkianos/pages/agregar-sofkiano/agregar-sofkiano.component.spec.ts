import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSofkianoComponent } from './agregar-sofkiano.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SofkianosService } from '../../services/sofkianos.service';
import { SofkianoDTO } from '../../interfaces/sofkianodto';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('AgregarSofkianoComponent comportamiento Guardar', () => {
  let component: AgregarSofkianoComponent;
  let fixture: ComponentFixture<AgregarSofkianoComponent>;
  let mockSofkianosService: jasmine.SpyObj<SofkianosService>;

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

  beforeEach(async () => {
    mockSofkianosService = jasmine.createSpyObj(['guardarSofkiano', 'actualizarSofkiano', 'listarPorDni']);
    mockSofkianosService.guardarSofkiano.and.returnValue(of(sofkianoDTO));
    mockSofkianosService.actualizarSofkiano.and.returnValue(of(sofkianoDTO));
    mockSofkianosService.listarPorDni.and.returnValue(of(sofkianoDTO));

    await TestBed.configureTestingModule({
      declarations: [ AgregarSofkianoComponent ],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatButtonModule,
        RouterTestingModule,
        MatDividerModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: SofkianosService, useValue: mockSofkianosService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSofkianoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente creado', () => {
    expect(component).toBeTruthy();
  });

  it('obtenerMensajeError cuando el error es requerido', () => {
    const mensajeError = component.obtenerMensajeError('tipoIdentificacion');
    expect(mensajeError).toEqual('El campo es obligatorio');
  });

  it('obtenerMensajeError cuando el error es por formato invalido', () => {
    component.form.get('numeroIdentificacion')?.setValue('ADASd123');

    const mensajeError = component.obtenerMensajeError('numeroIdentificacion');

    expect(mensajeError).toEqual('El formato del campo es invalido');
  });

  it('obtenerMensajeError cuando el error es longitud menor a la permitida', () => {
    component.form.get('numeroIdentificacion')?.setValue('123456734567');

    const mensajeError = component.obtenerMensajeError('numeroIdentificacion');

    expect(mensajeError).toEqual('El número de identificación debe ser de 10 digitos o menos');
  });

  it('obtenerMensajeError cuando longitud no es valida en un campo diferente a numeroIdentificacion', () => {
    component.form.get('primerNombre')?.setErrors({ maxlength: true });

    const mensajeError = component.obtenerMensajeError('primerNombre');

    expect(mensajeError).toEqual('Tamaño del campo invalido');
  });

  it('obtenerMensajeError debe ser vacio cuando no esta en la lista de errores', () => {
    component.form.get('primerNombre')?.setErrors({ ERROR: true });

    const mensajeError = component.obtenerMensajeError('primerNombre');

    expect(mensajeError).toEqual('');
  });

  it('guardarOActualizarSofkiano debe guardar la informacion del sofkiano', () => {
    component.form.get('tipoIdentificacion')?.setValue(tipoIdentificacion);
    component.form.get('numeroIdentificacion')?.setValue(numeroIdentificacion);
    component.form.get('primerNombre')?.setValue(stringTest);
    component.form.get('primerApellido')?.setValue(stringTest);
    component.form.get('direccion')?.setValue(stringTest);
    
    component.guardarOActualizarSofkiano();

    expect(component.form.get('tipoIdentificacion')?.value).toBeNull();
    expect(component.form.get('numeroIdentificacion')?.value).toBeNull();
    expect(component.form.get('primerNombre')?.value).toBeNull();
    expect(component.form.get('primerApellido')?.value).toBeNull();
    expect(component.form.get('direccion')?.value).toBeNull();
  });
});

describe('AgregarSofkianoComponent Comportamiento Editar', () => {
  let component: AgregarSofkianoComponent;
  let fixture: ComponentFixture<AgregarSofkianoComponent>;
  let mockSofkianosService: jasmine.SpyObj<SofkianosService>;

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

  beforeEach(async () => {
    mockSofkianosService = jasmine.createSpyObj(['guardarSofkiano', 'actualizarSofkiano', 'listarPorDni']);
    mockSofkianosService.guardarSofkiano.and.returnValue(of(sofkianoDTO));
    mockSofkianosService.actualizarSofkiano.and.returnValue(of(sofkianoDTO));
    mockSofkianosService.listarPorDni.and.returnValue(of(sofkianoDTO));

    await TestBed.configureTestingModule({
      declarations: [ AgregarSofkianoComponent ],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
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
          provide: SofkianosService,
          useValue: mockSofkianosService 
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              dni: 'CC123123',
            }),
          },
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSofkianoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('guardarOActualizarSofkiano debe actualizar la informacion del cliente', () => {    
    component.guardarOActualizarSofkiano();

    expect(component.form.get('tipoIdentificacion')?.value).not.toBeNull();
    expect(component.form.get('numeroIdentificacion')?.value).not.toBeNull();
    expect(component.form.get('primerNombre')?.value).not.toBeNull();
    expect(component.form.get('primerApellido')?.value).not.toBeNull();
    expect(component.form.get('direccion')?.value).not.toBeNull();
  });
});
