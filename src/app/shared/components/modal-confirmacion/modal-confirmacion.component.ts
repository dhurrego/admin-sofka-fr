import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacionComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
  ) {}

  public aceptar(): void {
    this.dialogRef.close(true);
  }
}
