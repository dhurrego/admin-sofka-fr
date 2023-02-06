import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { EstadisticasService } from '../../services/estadisticas.service';

@Component({
  selector: 'asignacion-sofkianos',
  templateUrl: './asignacion-sofkianos.component.html',
  styleUrls: ['./asignacion-sofkianos.component.css']
})
export class AsignacionSofkianosComponent implements OnInit {
  public etiquetasGraficaAsignacion: string[] = [ 'Con asignación', 'Sin asignación' ];
  public configuracionDonaAsignacion: ChartData<'doughnut'> = {
    labels: this.etiquetasGraficaAsignacion,
    datasets: [
      { data: [ 0, 500 ] }
    ]
  };
  public tipoGraficoAsignacion: ChartType = 'doughnut';

  constructor(private _estadisticasServices: EstadisticasService) { }

  ngOnInit(): void {
    this._estadisticasServices.consolidadoAsignacion()
      .subscribe( consolidadoDTO => {
        this.configuracionDonaAsignacion = {
          labels: this.etiquetasGraficaAsignacion,
          datasets: [
            { data: [ consolidadoDTO.conAsignacion, consolidadoDTO.sinAsignacion ] }
          ]
        };
      })
  }
}
