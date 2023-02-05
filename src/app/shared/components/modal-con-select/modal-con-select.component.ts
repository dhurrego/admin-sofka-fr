import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item, ModalSelector } from '../../interfaces/modalasignacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-con-select',
  templateUrl: './modal-con-select.component.html',
  styleUrls: ['./modal-con-select.component.css']
})
export class ModalConSelectComponent implements OnInit {

  public titulo: string = '';
  public descripcion: string = '';
  public nombreElementos: string = '';
  public elementos: Item[] = [];
  public form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalConSelectComponent, string>,
    @Inject(MAT_DIALOG_DATA) private _informacionModal: ModalSelector
  ) {
    const {titulo, descripcion, nombreElementos, elementos} = _informacionModal;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.nombreElementos = nombreElementos;
    this.elementos = elementos;
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      campo: [null, Validators.required]
    });
  }

  public devolverSeleccion(): void {
    this.dialogRef.close(this.form.get('campo')?.value);
  }

}
