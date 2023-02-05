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

describe('EstadisticasComponent', () => {
  let component: EstadisticasComponent;
  let fixture: ComponentFixture<EstadisticasComponent>;
  let mockEstadisticasService: jasmine.SpyObj<EstadisticasService>;

  const consolidadoDTO: ConsolidadoAsignacionDTO = { conAsignacion: 0, sinAsignacion: 0, totalSofkianos: 0}

  beforeEach(async () => {
    mockEstadisticasService = jasmine.createSpyObj(['consolidadoAsignacion']);
    mockEstadisticasService.consolidadoAsignacion.and.returnValue(of(consolidadoDTO));

    await TestBed.configureTestingModule({
      declarations: [ EstadisticasComponent, AsignacionSofkianosComponent ],
      imports: [
        MatDividerModule,
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

    fixture = TestBed.createComponent(EstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
