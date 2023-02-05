import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionSofkianosComponent } from './asignacion-sofkianos.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { EstadisticasService } from '../../services/estadisticas.service';
import { of } from 'rxjs';
import { ConsolidadoAsignacionDTO } from '../../interfaces/consolidadoasignaciondto';

describe('AsignacionSofkianosComponent', () => {
  let component: AsignacionSofkianosComponent;
  let fixture: ComponentFixture<AsignacionSofkianosComponent>;
  let mockEstadisticasService: jasmine.SpyObj<EstadisticasService>;

  const consolidadoDTO: ConsolidadoAsignacionDTO = { conAsignacion: 0, sinAsignacion: 0, totalSofkianos: 0}

  beforeEach(async () => {
    mockEstadisticasService = jasmine.createSpyObj(['consolidadoAsignacion']);
    mockEstadisticasService.consolidadoAsignacion.and.returnValue(of(consolidadoDTO));

    await TestBed.configureTestingModule({
      declarations: [ AsignacionSofkianosComponent ],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatCardModule,
        NgChartsModule
      ],
      providers: [
        { provide: EstadisticasService, useValue: mockEstadisticasService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionSofkianosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
