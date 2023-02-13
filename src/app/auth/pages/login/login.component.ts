import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';

import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { InicioSesionDTO } from '../../interfaces/iniciosesiondto';

import '../../../../assets/login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public form!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _router: Router,
              private _spinner: NgxSpinnerService,
              private _authService: AuthService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      correo: ['deivid.urrego@sofka.com.co', [Validators.required, Validators.email]],
      password: ['admin', [Validators.required]]
    })
  }

  ngAfterViewInit(): void {
    (window as any).initialize();
  }

  public login(): void {
    if(this.form.valid) {
      this._spinner.show();
      const inicioSesionDTO: InicioSesionDTO = this.form.getRawValue();
      this._authService.login(inicioSesionDTO)
        .subscribe( 
         { 
            next: ({token}) => {
              localStorage.setItem(environment.TOKEN_NAME, token);
              this._spinner.hide();
              this._router.navigate(['administracion']);
            },
            error: (_) => this._spinner.hide()
        }) 
    } else {
      this.form.markAllAsTouched();
    }
  }

}
