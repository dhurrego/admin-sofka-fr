import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarDefectoService } from 'src/app/shared/services/snackbar/snackbar-defecto.service';
import { RegistrarUsuarioDTO } from '../../interfaces/registrarusuariodto';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {
  public titulo = 'Agregar usuarios para iniciar sesión';

  public form!: FormGroup;
  public esActualizacion: boolean = false;

  constructor(private _usuariosServices: UsuariosService, 
              private _formBuilder: FormBuilder,
              private _snackBar: SnackbarDefectoService) {
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  public agregarUsuario(): void {
    const registrarUsuarioDTO: RegistrarUsuarioDTO = this.form.getRawValue();

    this._usuariosServices.guardarUsuario(registrarUsuarioDTO).subscribe(
      (_) => {
        this._snackBar.abrirMensajeEmergente("Se guardo el usuario exitosamente");
        this.form.reset();
      }
    );
  }

  public obtenerMensajeError(control: string): string {
    if (this.form.get(control)?.hasError('required')) {
      return 'El campo es obligatorio';
    }
    if (this.form.get(control)?.hasError('email')) {
      return 'El formato del correo invalido';
    }

    return '';
  }

  private inicializarFormulario(): void {
    this.form = this._formBuilder.group({
      correo: [null, [Validators.required, Validators.email] ],
      password: [null, [Validators.required]],
      rol: [null, [Validators.required]],
    });
  }
}
