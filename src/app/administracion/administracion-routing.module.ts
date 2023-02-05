import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { EstadisticasComponent } from './dashboard/pages/estadisticas/estadisticas.component';
import { ListarSofkianosComponent } from './sofkianos/pages/listar-sofkianos/listar-sofkianos.component';
import { ListarClientesComponent } from './clientes/pages/listar-clientes/listar-clientes.component';
import { AgregarSofkianoComponent } from './sofkianos/pages/agregar-sofkiano/agregar-sofkiano.component';
import { AgregarClienteComponent } from './clientes/pages/agregar-cliente/agregar-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      { path: 'dashboard', component: EstadisticasComponent },
      { path: 'sofkianos', component: ListarSofkianosComponent },
      { path: 'sofkianos/agregar', component: AgregarSofkianoComponent },
      { path: 'sofkianos/editar/:dni', component: AgregarSofkianoComponent },
      { path: 'clientes', component: ListarClientesComponent },
      { path: 'clientes/agregar', component: AgregarClienteComponent },
      { path: 'clientes/editar/:nit', component: AgregarClienteComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
