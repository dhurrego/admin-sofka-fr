import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarDefectoService {

  constructor(private _snackBar: MatSnackBar) { }

  public abrirMensajeEmergente(mensaje: string) {
    this._snackBar.open(mensaje, "Entendido", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 5000
    })
  }
}
