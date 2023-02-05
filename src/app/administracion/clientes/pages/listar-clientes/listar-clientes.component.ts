import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ClientesService } from '../../services/clientes.service';

import { ClienteDTO } from '../../interfaces/clientedto';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit, AfterViewInit {

  public clientes: ClienteDTO[] = [];

  public displayedColumns: string[] = ['nit', 'razonSocial', 'acciones'];
  public dataSource: MatTableDataSource<ClienteDTO>;

  public cargando: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _clientesServices: ClientesService) {
    this.dataSource = new MatTableDataSource<ClienteDTO>(this.clientes);
  }
  
  ngOnInit(): void {
    this._clientesServices.listarTodos()
    .subscribe( clientes => {
      this.cargando = false;
      this.clientes = clientes;
      this.actualizarTabla(clientes);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private actualizarTabla(clientes: ClienteDTO[]): void {
    this.dataSource = new MatTableDataSource(clientes);
    this.dataSource.paginator = this.paginator;
  }
}
