import { TestBed } from '@angular/core/testing';

import { ServerErrorInterceptorService } from './server-error-interceptor.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ServerErrorInterceptorService', () => {
  let service: ServerErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule
      ]
    });
    service = TestBed.inject(ServerErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
