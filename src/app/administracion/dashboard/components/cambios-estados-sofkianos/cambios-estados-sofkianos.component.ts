import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { EstadisticasService } from '../../services/estadisticas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/es';
import { CantidadCambiosEstadoSofkianoDTO } from '../../interfaces/cantidadcambiosestadossofkianos';

@Component({
  selector: 'cambios-estados-sofkianos',
  templateUrl: './cambios-estados-sofkianos.component.html',
  styleUrls: ['./cambios-estados-sofkianos.component.css'],
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
export class CambiosEstadosSofkianosComponent implements OnInit {
  public etiquetasDiagrama: string[] = [ 'Ingresos', 'Salidas' ];
  public datosDiagrama: ChartData<'pie'> = {
    labels: this.etiquetasDiagrama,
    datasets: [
      { data: [ 10, 10 ] }
    ]
  };

  public configuracionDiagrama: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };

  public tipoDiagrama: ChartType = 'pie';
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
    this.consultarCambiosEstados();
  }

  public consultarCambiosEstados(): void {
    if(this.form.valid) {
      const fechaInicial = this._adapter.format(moment(this.form.get('fechaInicial')?.value), "YYYY-MM-DD");
      const fechaFinal = this._adapter.format(moment(this.form.get('fechaFinal')?.value), "YYYY-MM-DD")

      this._estadisticasServices.consultarCambiosEstados(fechaInicial, fechaFinal)
        .subscribe(cantidadCambios => this.dibujarGrafico(cantidadCambios))
    }
  }

  private construirFormulario() {
    this.form = this._formBuilder.group({
      fechaInicial: ["2023-01-01", [Validators.required]],
      fechaFinal: ["2023-12-31", [Validators.required]]
    })
  }

  private dibujarGrafico(cantidadCambios: CantidadCambiosEstadoSofkianoDTO) {
    this.datosDiagrama = {
      labels: this.etiquetasDiagrama,
      datasets: [
        { data: [ cantidadCambios.cantidadIngresos, cantidadCambios.cantidadSalidas ] }
      ]
    };
  }
}
