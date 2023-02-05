import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalConfirmacionComponent } from './modal-confirmacion.component';

describe('ModalConfirmacionComponent', () => {
  let component: ModalConfirmacionComponent;
  let fixture: ComponentFixture<ModalConfirmacionComponent>;
  
  const dialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmacionComponent ],
      imports: [ 
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [ 
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Probando metodo aceptar', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.aceptar();
    expect(spy).toHaveBeenCalled();
  });
});
