import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SofkianosService } from '../../services/sofkianos.service';
import { SnackbarDefectoService } from '../../../../shared/services/snackbar/snackbar-defecto.service';

import { SofkianoDTO } from '../../interfaces/sofkianodto';

@Component({
  selector: 'app-agregar-sofkiano',
  templateUrl: './agregar-sofkiano.component.html',
  styleUrls: ['./agregar-sofkiano.component.css']
})
export class AgregarSofkianoComponent implements OnInit {
  public titulo = 'Agregar sofkiano';

  public form!: FormGroup;
  public esActualizacion: boolean = false;

  constructor(private _sofkianosService: SofkianosService, 
              private _formBuilder: FormBuilder,
              private _snackBar: SnackbarDefectoService,
              private _route: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.validarSiEsActualizacion();
  }

  public guardarOActualizarSofkiano(): void {
    if(this.esActualizacion) {
      this.actualizarSofkiano();
      return;
    }
    this.agregarSofkiano();
  }

  public obtenerMensajeError(control: string): string {
    if (this.form.get(control)?.hasError('required')) {
      return 'El campo es obligatorio';
    }
    if (this.form.get(control)?.hasError('pattern')) {
      return 'El formato del campo es invalido';
    }
    if (this.form.get(control)?.hasError('maxlength')) {
      return control == 'numeroIdentificacion' ? 'El número de identificación debe ser de 10 digitos o menos' : 'Tamaño del campo invalido';
    }

    return '';
  }

  private inicializarFormulario(): void {
    this.form = this._formBuilder.group({
      tipoIdentificacion: [null, [Validators.required] ],
      numeroIdentificacion: [null, [Validators.required, Validators.pattern("[0-9 ]*"), Validators.maxLength(10)] ],
      primerNombre: [null, [Validators.required, Validators.pattern("[a-zA-ZáéíóúÁÉÍÓÚÑñ ]*")] ],
      segundoNombre: [null, [Validators.pattern("[a-zA-ZáéíóúÁÉÍÓÚÑñ ]*")] ],
      primerApellido: [null, [Validators.required, Validators.pattern("[a-zA-ZáéíóúÁÉÍÓÚÑñ ]*")] ],
      segundoApellido: [null, [Validators.pattern("[a-zA-ZáéíóúÁÉÍÓÚÑñ ]*")] ],
      direccion: [null, [Validators.required] ]
    });
  }

  
  private validarSiEsActualizacion(): void {
    this._route.params.subscribe( ({dni}) => {
      if(dni) {
        this.esActualizacion = true;
        this.titulo = 'Editar sofkiano';
        this.obtenerInformacionSofkiano(dni);
      }
    })
  }

  private obtenerInformacionSofkiano(dni: string) {
    this._sofkianosService.listarPorDni(dni).subscribe(
      {
        next: sofkiano => {
          this.form.get('tipoIdentificacion')?.setValue(sofkiano.tipoIdentificacion);
          this.form.get('numeroIdentificacion')?.setValue(sofkiano.numeroIdentificacion);
          this.form.get('primerNombre')?.setValue(sofkiano.primerNombre);
          this.form.get('segundoNombre')?.setValue(sofkiano.segundoNombre);
          this.form.get('primerApellido')?.setValue(sofkiano.primerApellido);
          this.form.get('segundoApellido')?.setValue(sofkiano.segundoApellido);
          this.form.get('direccion')?.setValue(sofkiano.direccion);

          this.form.get('tipoIdentificacion')?.disable();
          this.form.get('numeroIdentificacion')?.disable();
        },
        error: (_) => {
          this._router.navigateByUrl('/administracion/sofkianos/agregar');
        }
    });
  }

  private agregarSofkiano(): void {
    const sofkianoDTO: SofkianoDTO = this.form.getRawValue();

    this._sofkianosService.guardarSofkiano(sofkianoDTO).subscribe(
      (_) => {
        this._snackBar.abrirMensajeEmergente("Se guardo el sofkiano exitosamente");
        this.form.reset();
      }
    );
  }

  private actualizarSofkiano(): void {
    const sofkianoDTO: SofkianoDTO = this.form.getRawValue();

    this._sofkianosService.actualizarSofkiano(sofkianoDTO).subscribe(
      (_) => {
        this._snackBar.abrirMensajeEmergente("Se actualizado el sofkiano exitosamente");
      }
    );
  }
}
