import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SofkianoDTO } from '../../interfaces/sofkianodto';
import { SofkianosService } from '../../services/sofkianos.service';
import { Sofkiano } from '../../interfaces/sofkiano';
import { map, tap, switchMap, of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmacionComponent } from 'src/app/shared/components/modal-confirmacion/modal-confirmacion.component';
import { SnackbarDefectoService } from 'src/app/shared/services/snackbar/snackbar-defecto.service';
import { ClientesService } from 'src/app/administracion/clientes/services/clientes.service';
import { Item, ModalSelector } from 'src/app/shared/interfaces/modalasignacion';
import { ModalConSelectComponent } from 'src/app/shared/components/modal-con-select/modal-con-select.component';

@Component({
  selector: 'app-listar-sofkianos',
  templateUrl: './listar-sofkianos.component.html',
  styleUrls: ['./listar-sofkianos.component.css']
})
export class ListarSofkianosComponent implements OnInit, AfterViewInit {

  private _sofkianosDTO: SofkianoDTO[] = [];

  public sofkianos: Sofkiano[] = [];

  public displayedColumns: string[] = ['dni', 'nombre', 'direccion', 'estado', 'cliente', 'acciones'];
  public dataSource: MatTableDataSource<Sofkiano>;

  public cargando: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _sofkianosServices: SofkianosService,
              private  _clientesServices: ClientesService,
              private _snackbar: SnackbarDefectoService,
              private _dialogo: MatDialog) {
    this.dataSource = new MatTableDataSource<Sofkiano>(this.sofkianos);
  }
  
  ngOnInit(): void {
    this.listarInformacionSofkianos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public activarSofkiano(dni: string): void {
    this.abrirModal('¿Desea activar al sofkiano?')
    .afterClosed()
      .pipe(
        switchMap( acepto => {
          if(acepto) {
            return this._sofkianosServices.activarSofkiano(dni);
          }
          return of(null);
        })
      )
      .subscribe( respuestaActivacion => {
        if(respuestaActivacion) {
          this._snackbar.abrirMensajeEmergente(respuestaActivacion.respuesta);
          this.listarInformacionSofkianos();
        }
      })
  }

  public inactivarSofkiano(dni: string): void {
    this.abrirModal('¿Desea inactivar al sofkiano?')
      .afterClosed()
      .pipe(
        switchMap( acepto => {
          if(acepto) {
            return this._sofkianosServices.inactivarSofkiano(dni);
          }
          return of(null);
        })
      )
      .subscribe( respuestaInactivacion => {
        if(respuestaInactivacion) {
          this._snackbar.abrirMensajeEmergente(respuestaInactivacion.respuesta);
          this.listarInformacionSofkianos();
        }
      })
  }

  public retirarAsignacion(dni: string): void {
    this.abrirModal('¿Desea retirar la asignación actual del sofkiano?')
      .afterClosed()
      .pipe(
        switchMap( acepto => {
          if(acepto) {
            return this._sofkianosServices.retirarAsignacion(dni);
          }
          return of(null);
        })
      )
      .subscribe( respuestaInactivacion => {
        if(respuestaInactivacion) {
          this._snackbar.abrirMensajeEmergente(respuestaInactivacion.respuesta);
          this.listarInformacionSofkianos();
        }
      })
  }

  public realizarAsignacion(dniSofkiano: string): void {
    this._clientesServices.listarTodos()
      .pipe(
        switchMap( clientes => {

          const elementos: Item[] = clientes.map(cliente => {
            return {
              valor: cliente.nit,
              descripcion: cliente.razonSocial
            }
          })

          const informacionModal: ModalSelector = {
            titulo: 'Asignar cliente',
            descripcion: 'Seleccione el cliente que desea asignar',
            elementos,
            nombreElementos: 'Clientes'
          }

          return this._dialogo.open(ModalConSelectComponent, {
            data: informacionModal,
            width: '400px'
          }).afterClosed()
        }),
        switchMap( nitCliente => {
          if(nitCliente) {
            return this._sofkianosServices.realizarAsignacion({ dniSofkiano, nitCliente });
          } 
          return of(null);
        })
      ).subscribe( respuestaAsignacion => {
        if(respuestaAsignacion) {
          this._snackbar.abrirMensajeEmergente(respuestaAsignacion.respuesta);
          this.listarInformacionSofkianos();
        }
      })
      
  }

  private abrirModal(mensaje: string): MatDialogRef<ModalConfirmacionComponent, boolean> {
    return this._dialogo.open(ModalConfirmacionComponent, {
      data: mensaje,
      width: '300px'
    });
  }

  private listarInformacionSofkianos() {
    this._sofkianosServices.listarTodos()
    .pipe(
      tap(sofkianosDTO => this._sofkianosDTO = sofkianosDTO),
      map(this.convertirASofkiano)
    )
    .subscribe( sofkianos => {
      this.cargando = false;
      this.sofkianos = sofkianos;
      this.actualizarTabla(sofkianos);
    })
  }

  private actualizarTabla(sofkianos: Sofkiano[]): void {
    this.dataSource = new MatTableDataSource(sofkianos);
    this.dataSource.paginator = this.paginator;
  }

  private convertirASofkiano(sofkianosDTO: SofkianoDTO[]): Sofkiano[] {
    return sofkianosDTO.map( sofkianoDTO => {

      const dni: string = `${sofkianoDTO.tipoIdentificacion}${sofkianoDTO.numeroIdentificacion}`;
      const {primerNombre, segundoNombre, primerApellido, segundoApellido, cliente} = sofkianoDTO;
      const nombreCompleto: string = `${primerNombre} ${segundoNombre ? segundoNombre : ''} ${primerApellido} ${segundoApellido ? segundoApellido : ''}`;

      return {
        dni,
        nombreCompleto,
        direccion: sofkianoDTO.direccion,
        estado: sofkianoDTO.activo ? 'ACTIVO' : 'INACTIVO',
        cliente: cliente ? `${cliente.nit} - ${cliente.razonSocial}` : 'SIN ASIGNACIÓN'
      } as Sofkiano;

    })
  }
}
