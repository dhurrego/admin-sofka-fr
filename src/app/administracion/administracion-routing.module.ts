import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/guard/auth.guard';

import { InicioComponent } from './inicio/inicio.component';
import { EstadisticasComponent } from './dashboard/pages/estadisticas/estadisticas.component';
import { ListarSofkianosComponent } from './sofkianos/pages/listar-sofkianos/listar-sofkianos.component';
import { ListarClientesComponent } from './clientes/pages/listar-clientes/listar-clientes.component';
import { AgregarSofkianoComponent } from './sofkianos/pages/agregar-sofkiano/agregar-sofkiano.component';
import { AgregarClienteComponent } from './clientes/pages/agregar-cliente/agregar-cliente.component';
import { UsuariosGuard } from './usuarios/guard/usuarios.guard';
import { AgregarUsuarioComponent } from './usuarios/pages/agregar-usuario/agregar-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      { path: 'dashboard', component: EstadisticasComponent, canActivate: [AuthGuard] },
      { path: 'sofkianos', component: ListarSofkianosComponent, canActivate: [AuthGuard] },
      { path: 'sofkianos/agregar', component: AgregarSofkianoComponent, canActivate: [AuthGuard] },
      { path: 'sofkianos/editar/:dni', component: AgregarSofkianoComponent, canActivate: [AuthGuard] },
      { path: 'clientes', component: ListarClientesComponent, canActivate: [AuthGuard] },
      { path: 'clientes/agregar', component: AgregarClienteComponent, canActivate: [AuthGuard] },
      { path: 'clientes/editar/:nit', component: AgregarClienteComponent, canActivate: [AuthGuard] },
      { path: 'usuarios/registrar', component: AgregarUsuarioComponent, canActivate: [AuthGuard, UsuariosGuard] },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
