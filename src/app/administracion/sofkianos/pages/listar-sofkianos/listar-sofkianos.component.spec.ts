import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSofkianosComponent } from './listar-sofkianos.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SofkianosService } from '../../services/sofkianos.service';
import { of } from 'rxjs';
import { RespuestaGenerica } from '../../../../shared/interfaces/respuestagenerica';
import { SofkianoDTO } from '../../interfaces/sofkianodto';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientesService } from 'src/app/administracion/clientes/services/clientes.service';
import { ClienteDTO } from 'src/app/administracion/clientes/interfaces/clientedto';

describe('ListarSofkianosComponent', () => {
  let component: ListarSofkianosComponent;
  let fixture: ComponentFixture<ListarSofkianosComponent>;

  let mockSofkianosService: jasmine.SpyObj<SofkianosService>;
  let mockClientesService: jasmine.SpyObj<ClientesService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  const dni: string = 'CC12312312';
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

  const clienteDTO: ClienteDTO = { nit: '8905652', razonSocial: stringTest }

  const respuestaGenerica: RespuestaGenerica = { respuesta: 'ok' }

  beforeEach(async () => {
    mockSofkianosService = jasmine.createSpyObj(['listarTodos', 'activarSofkiano', 'inactivarSofkiano', 'retirarAsignacion', 'realizarAsignacion']);
    mockSofkianosService.listarTodos.and.returnValue(of([sofkianoDTO]));
    mockSofkianosService.activarSofkiano.and.returnValue(of(respuestaGenerica));
    mockSofkianosService.inactivarSofkiano.and.returnValue(of(respuestaGenerica));
    mockSofkianosService.retirarAsignacion.and.returnValue(of(respuestaGenerica));
    mockSofkianosService.realizarAsignacion.and.returnValue(of(respuestaGenerica));

    mockClientesService = jasmine.createSpyObj(['listarTodos']);
    mockClientesService.listarTodos.and.returnValue(of([clienteDTO]));

    mockMatDialog = jasmine.createSpyObj(['open']);
    mockMatDialog.open.and.returnValue({afterClosed: () => of('A')} as any)

    await TestBed.configureTestingModule({
      declarations: [ ListarSofkianosComponent ],
      imports: [
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        MatSnackBarModule,
        MatDividerModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SofkianosService, useValue: mockSofkianosService },
        { provide: ClientesService, useValue: mockClientesService },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSofkianosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('se deberia activarSofkiano', () => {
    component.activarSofkiano(dni);
    expect(mockSofkianosService.activarSofkiano).toHaveBeenCalled();
  });

  it('se deberia inactivarSofkiano', () => {
    component.inactivarSofkiano(dni);
    expect(mockSofkianosService.inactivarSofkiano).toHaveBeenCalled();
  });

  it('se deberia retirarAsignacion', () => {
    component.retirarAsignacion(dni);
    expect(mockSofkianosService.retirarAsignacion).toHaveBeenCalled();
  });

  it('se deberia realizarAsignacion', () => {
    component.realizarAsignacion(dni);
    expect(mockSofkianosService.realizarAsignacion).toHaveBeenCalled();
  });
  
  
});
