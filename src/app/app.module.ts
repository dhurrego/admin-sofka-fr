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
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
