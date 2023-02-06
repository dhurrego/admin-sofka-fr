import { TestBed } from '@angular/core/testing';

import { SnackbarDefectoService } from './snackbar-defecto.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SnackbarDefectoService', () => {
  let service: SnackbarDefectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule
      ]
    });
    service = TestBed.inject(SnackbarDefectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
