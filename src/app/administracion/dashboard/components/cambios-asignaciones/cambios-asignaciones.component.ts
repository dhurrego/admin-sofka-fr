import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/es';

import { CantidadCambiosAsignacionesDTO } from '../../interfaces/cantidadcambiosasignaciones';

import { EstadisticasService } from '../../services/estadisticas.service';

@Component({
  selector: 'cambios-asignaciones',
  templateUrl: './cambios-asignaciones.component.html',
  styleUrls: ['./cambios-asignaciones.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-CO'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class CambiosAsignacionesComponent {
  public configuracionDiagrama: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    scales: {
      x: {},
      y: {
        min: 0,
        ticks: { color: 'black' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    },
    plugins: {
      legend: { display: true },
    }
  };

  public etiquetasDiagrama: string[] = [ 'Sin empresa' ];
  public tipoDiagrama: ChartType = 'bar';

  public datosDiagrama: ChartData<'bar'> = {
    labels: this.etiquetasDiagrama,
    datasets: [
      { data: [ 0 ], label: 'Ingresos' },
      { data: [ 0 ], label: 'Salidas' }
    ]
  };

  public form!: FormGroup;

  constructor(private _estadisticasServices: EstadisticasService,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<Moment>,
              @Inject(MAT_DATE_LOCALE) private _locale: string) {
    this._locale = 'es';
    this._adapter.setLocale(this._locale);
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.consultarCambiosAsignaciones();
  }

  public consultarCambiosAsignaciones(): void {
    if(this.form.valid) {
      const fechaInicial = this._adapter.format(moment(this.form.get('fechaInicial')?.value), "YYYY-MM-DD");
      const fechaFinal = this._adapter.format(moment(this.form.get('fechaFinal')?.value), "YYYY-MM-DD")

      this._estadisticasServices.consultarCambiosAsignaciones(fechaInicial, fechaFinal)
        .subscribe(cambiosAsignaciones => this.dibujarGrafico(cambiosAsignaciones))
    }
  }

  private construirFormulario() {
    this.form = this._formBuilder.group({
      fechaInicial: ["2023-01-01", [Validators.required]],
      fechaFinal: ["2023-12-31", [Validators.required]]
    })
  }

  private dibujarGrafico(cambiosAsignaciones: CantidadCambiosAsignacionesDTO[]): void {
    const limitarCantidadEmpresas = cambiosAsignaciones.slice(0, 6);

    this.etiquetasDiagrama = limitarCantidadEmpresas.map( cambio => cambio.cliente.razonSocial );
    const nuevosDatosIngresos = limitarCantidadEmpresas.map( cambio => cambio.cantidadIngresos );
    const nuevosDatosSalidas = limitarCantidadEmpresas.map( cambio => cambio.cantidadSalidas );

    this.datosDiagrama = {
      labels: this.etiquetasDiagrama,
      datasets: [
        { data: nuevosDatosIngresos, label: 'Ingresos' },
        { data: nuevosDatosSalidas, label: 'Salidas' }
      ]
    };
  }
}
