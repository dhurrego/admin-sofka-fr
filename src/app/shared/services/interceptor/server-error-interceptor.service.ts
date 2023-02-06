import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { SnackbarDefectoService } from '../snackbar/snackbar-defecto.service';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorInterceptorService implements HttpInterceptor {

  constructor(private _snackbar: SnackbarDefectoService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError( ({error}) => {
        this._snackbar.abrirMensajeEmergente(error.detail);
        throw error;
      })
    );
  }
}
