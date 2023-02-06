import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiosEstadosSofkianosComponent } from './cambios-estados-sofkianos.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { EstadisticasService } from '../../services/estadisticas.service';
import { CantidadCambiosEstadoSofkianoDTO } from '../../interfaces/cantidadcambiosestadossofkianos';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CambiosEstadosSofkianosComponent', () => {
  let component: CambiosEstadosSofkianosComponent;
  let fixture: ComponentFixture<CambiosEstadosSofkianosComponent>;
  let mockEstadisticasService: jasmine.SpyObj<EstadisticasService>;

  const cantidadCambiosEstadosDTO: CantidadCambiosEstadoSofkianoDTO = { cantidadIngresos: 0, cantidadSalidas: 0 };

  beforeEach(async () => {
    mockEstadisticasService = jasmine.createSpyObj(['consultarCambiosEstados']);
    mockEstadisticasService.consultarCambiosEstados.and.returnValue(of(cantidadCambiosEstadosDTO));
    await TestBed.configureTestingModule({
      declarations: [ CambiosEstadosSofkianosComponent ],
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

    fixture = TestBed.createComponent(CambiosEstadosSofkianosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
