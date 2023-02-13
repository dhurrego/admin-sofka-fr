import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { ModalConfirmacionComponent } from './shared/components/modal-confirmacion/modal-confirmacion.component';
import { ModalConSelectComponent } from './shared/components/modal-con-select/modal-con-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServerErrorInterceptorService } from './shared/services/interceptor/server-error-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

export function tokenGetter() {
  return localStorage.getItem(environment.TOKEN_NAME)?.substring(7) || '';
}

@NgModule({
  declarations: [
    AppComponent,
    ModalConfirmacionComponent,
    ModalConSelectComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.DOMAIN],
        disallowedRoutes: [`${environment.baseUrl}/seguridad/acceder`]
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
