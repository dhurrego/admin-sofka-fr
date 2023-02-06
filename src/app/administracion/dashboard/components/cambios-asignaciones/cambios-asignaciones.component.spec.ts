import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgChartsModule } from 'ng2-charts';

import { CambiosAsignacionesComponent } from './cambios-asignaciones.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CantidadCambiosAsignacionesDTO } from '../../interfaces/cantidadcambiosasignaciones';
import { EstadisticasService } from '../../services/estadisticas.service';
import { of } from 'rxjs';

describe('CambiosAsignacionesComponent', () => {
  let component: CambiosAsignacionesComponent;
  let fixture: ComponentFixture<CambiosAsignacionesComponent>;
  let mockEstadisticasService: jasmine.SpyObj<EstadisticasService>;

  const cantidadCambiosAsignacionDTO: CantidadCambiosAsignacionesDTO = { cantidadIngresos: 0, cantidadSalidas: 0, cliente: { nit: '8904983', razonSocial: 'EMPRESA'}};

  beforeEach(async () => {
    mockEstadisticasService = jasmine.createSpyObj(['consultarCambiosAsignaciones']);
    mockEstadisticasService.consultarCambiosAsignaciones.and.returnValue(of([cantidadCambiosAsignacionDTO]));

    await TestBed.configureTestingModule({
      declarations: [ CambiosAsignacionesComponent ],
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
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiosAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
