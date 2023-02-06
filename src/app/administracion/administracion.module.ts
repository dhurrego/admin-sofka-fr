import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

import { AdministracionRoutingModule } from './administracion-routing.module';

import { InicioComponent } from './inicio/inicio.component';
import { EstadisticasComponent } from './dashboard/pages/estadisticas/estadisticas.component';
import { ListarSofkianosComponent } from './sofkianos/pages/listar-sofkianos/listar-sofkianos.component';
import { AgregarSofkianoComponent } from './sofkianos/pages/agregar-sofkiano/agregar-sofkiano.component';
import { ListarClientesComponent } from './clientes/pages/listar-clientes/listar-clientes.component';
import { AgregarClienteComponent } from './clientes/pages/agregar-cliente/agregar-cliente.component';
import { AsignacionSofkianosComponent } from './dashboard/components/asignacion-sofkianos/asignacion-sofkianos.component';
import { CambiosEstadosSofkianosComponent } from './dashboard/components/cambios-estados-sofkianos/cambios-estados-sofkianos.component';
import { CambiosAsignacionesComponent } from './dashboard/components/cambios-asignaciones/cambios-asignaciones.component';

@NgModule({
  declarations: [
    InicioComponent,
    EstadisticasComponent,
    ListarSofkianosComponent,
    AgregarSofkianoComponent,
    ListarClientesComponent,
    AgregarClienteComponent,
    AsignacionSofkianosComponent,
    CambiosEstadosSofkianosComponent,
    CambiosAsignacionesComponent
  ],
  imports: [
    AdministracionRoutingModule,
    CommonModule,
    MaterialModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ]
})
export class AdministracionModule { }
