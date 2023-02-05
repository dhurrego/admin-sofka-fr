import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarClientesComponent } from './listar-clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteDTO } from '../../interfaces/clientedto';
import { ClientesService } from '../../services/clientes.service';
import { of } from 'rxjs';

describe('ListarClientesComponent', () => {
  let component: ListarClientesComponent;
  let fixture: ComponentFixture<ListarClientesComponent>;
  let mockClientesService: jasmine.SpyObj<ClientesService>;
  
  const nit: string = '8908560652';
  const razonSocial: string = 'TEST';
  const clientDTO: ClienteDTO = { nit, razonSocial }

  beforeEach(async () => {
    mockClientesService = jasmine.createSpyObj(['listarTodos']);
    mockClientesService.listarTodos.and.returnValue(of([clientDTO]));

    await TestBed.configureTestingModule({
      declarations: [ ListarClientesComponent ],
      imports: [
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        MatSnackBarModule,
        MatDividerModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [{
        provide: ClientesService,
        useValue: mockClientesService 
     }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
