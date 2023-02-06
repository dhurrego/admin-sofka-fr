import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConSelectComponent } from './modal-con-select.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalConSelectComponent', () => {
  let component: ModalConSelectComponent;
  let fixture: ComponentFixture<ModalConSelectComponent>;

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConSelectComponent, ],
      imports: [ 
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [ 
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Probando metodo devolverSeleccion', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();

    component.devolverSeleccion();

    expect(spy).toHaveBeenCalled();
  });
});
