import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientesService } from '../../services/clientes.service';
import { SnackbarDefectoService } from 'src/app/shared/services/snackbar/snackbar-defecto.service';

import { ClienteDTO } from '../../interfaces/clientedto';


@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

  public titulo = 'Agregar cliente';

  public form!: FormGroup;
  public esActualizacion: boolean = false;

  constructor(private _clientesServices: ClientesService, 
              private _formBuilder: FormBuilder,
              private _snackBar: SnackbarDefectoService,
              private _route: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.validarSiEsActualizacion();
  }

  public guardarOActualizarCliente(): void {
    if(this.esActualizacion) {
      this.actualizarCliente();
      return;
    }
    this.agregarCliente();
  }

  public obtenerMensajeError(control: string): string {
    if (this.form.get(control)?.hasError('required')) {
      return 'El campo es obligatorio';
    }
    if (this.form.get(control)?.hasError('pattern')) {
      return 'El formato del campo es invalido';
    }
    if (this.form.get(control)?.hasError('minlength') || this.form.get(control)?.hasError('maxlength')) {
      return control == 'nit' ? 'El NIT debe ser de 10 digitos incluido el código de verificación' : 'Tamaño del campo invalido';
    }

    return '';
  }

  private inicializarFormulario(): void {
    this.form = this._formBuilder.group({
      nit: [null, [Validators.required, Validators.pattern("[0-9 ]*"), Validators.minLength(10), Validators.maxLength(10)] ],
      razonSocial: [null, [Validators.required, Validators.pattern("[a-zA-ZáéíóúÁÉÍÓÚÑñ ]*")] ]
    });
  }

  private validarSiEsActualizacion(): void {
    this._route.params.subscribe( ({nit}) => {
      if(nit) {
        this.esActualizacion = true;
        this.titulo = 'Editar cliente';
        this.obtenerInformacionCliente(nit);
      }
    })
  }

  private obtenerInformacionCliente(nit: string) {
    this._clientesServices.listarPorNit(nit).subscribe(
      {
        next: cliente => {
          this.form.setValue(cliente);
          this.form.get('nit')?.disable();
        },
        error: (_) => {
          this._router.navigateByUrl('/administracion/clientes/agregar');
        }
      });
  }

  private agregarCliente(): void {
    const clienteDTO: ClienteDTO = this.form.getRawValue();

    this._clientesServices.guardarCliente(clienteDTO).subscribe(
      (_) => {
        this._snackBar.abrirMensajeEmergente("Se guardo el cliente exitosamente");
        this.form.reset();
      }
    );
  }

  private actualizarCliente(): void {
    const clienteDTO: ClienteDTO = this.form.getRawValue();

    this._clientesServices.actualizarCliente(clienteDTO).subscribe(
      (_) => {
        this._snackBar.abrirMensajeEmergente("Se actualizado el cliente exitosamente");
      }
    );
  }

}
