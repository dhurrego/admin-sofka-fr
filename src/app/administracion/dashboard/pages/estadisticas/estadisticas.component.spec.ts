import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasComponent } from './estadisticas.component';
import { MatDividerModule } from '@angular/material/divider';
import { AsignacionSofkianosComponent } from '../../components/asignacion-sofkianos/asignacion-sofkianos.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { EstadisticasService } from '../../services/estadisticas.service';
import { ConsolidadoAsignacionDTO } from '../../interfaces/consolidadoasignaciondto';
import { of } from 'rxjs';
import { CambiosEstadosSofkianosComponent } from '../../components/cambios-estados-sofkianos/cambios-estados-sofkianos.component';
import { CambiosAsignacionesComponent } from '../../components/cambios-asignaciones/cambios-asignaciones.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CantidadCambiosAsignacionesDTO } from '../../interfaces/cantidadcambiosasignaciones';
import { CantidadCambiosEstadoSofkianoDTO } from '../../interfaces/cantidadcambiosestadossofkianos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EstadisticasComponent', () => {
  let component: EstadisticasComponent;
  let fixture: ComponentFixture<EstadisticasComponent>;
  let mockEstadisticasService: jasmine.SpyObj<EstadisticasService>;

  const consolidadoDTO: ConsolidadoAsignacionDTO = { conAsignacion: 0, sinAsignacion: 0, totalSofkianos: 0};
  const cantidadCambiosAsignacionDTO: CantidadCambiosAsignacionesDTO = { cantidadIngresos: 0, cantidadSalidas: 0, cliente: { nit: '8904983', razonSocial: 'EMPRESA'}};
  const cantidadCambiosEstadosDTO: CantidadCambiosEstadoSofkianoDTO = { cantidadIngresos: 0, cantidadSalidas: 0 };

  beforeEach(async () => {
    mockEstadisticasService = jasmine.createSpyObj(['consolidadoAsignacion', 'consultarCambiosAsignaciones', 'consultarCambiosEstados']);
    mockEstadisticasService.consolidadoAsignacion.and.returnValue(of(consolidadoDTO));
    mockEstadisticasService.consultarCambiosAsignaciones.and.returnValue(of([cantidadCambiosAsignacionDTO]));
    mockEstadisticasService.consultarCambiosEstados.and.returnValue(of(cantidadCambiosEstadosDTO));

    await TestBed.configureTestingModule({
      declarations: [ 
        EstadisticasComponent, 
        AsignacionSofkianosComponent, 
        CambiosEstadosSofkianosComponent, 
        CambiosAsignacionesComponent 
      ],
      imports: [
        MatDividerModule,
        HttpClientModule,
        MatSnackBarModule,
        MatCardModule,
        NgChartsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatMomentDateModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: EstadisticasService, useValue: mockEstadisticasService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
