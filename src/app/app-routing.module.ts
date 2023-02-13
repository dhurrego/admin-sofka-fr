import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule )
  },
  {
    path: 'administracion',
    loadChildren: () => import( './administracion/administracion.module' ).then( m => m.AdministracionModule ),
    canLoad: [AuthGuard]
  },
  { path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
