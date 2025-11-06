import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { AuthResponseModel } from 'src/app/shared/response/authResponse.model';
import { FireAuthService } from 'src/app/shared/services/fire-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  formlogin!: FormGroup;
  errorMessage: string = '';
  constructor(
    private _fb:FormBuilder,
    private _router:Router,
    private _fireAuthService : FireAuthService,
    private _AuthResponseModel: AuthResponseModel
  ) {}

  ngOnInit(): void {
    this.formlogin = this._fb.group({
      email:     ['',[Validators.required,Validators.email]],
      password:  ['', Validators.required],
    });
  }

  async loginUser(user:User){
    if (this.formlogin.invalid) {
      this.errorMessage = 'Por favor, rellena todos los campos correctamente';
      return;
    }
    this.errorMessage = '';

    try {
      const res = await this._fireAuthService.signIn(user);
      if (res.success && res.data) {
        this._fireAuthService.setToken(res.data.id!, 'token-placeholder'); // TODO: obtener el token real
        // Navegar al perfil con el id del usuario
        const navigationSuccess = await this._router.navigate(['/profile', res.data.id, 'list']);

        if (!navigationSuccess) {
          // Error en la navegación (caso edge)
          this.errorMessage = 'Error de navegación al perfil. Verifica la conexión';
          console.error('Error en la navegación al perfil');
        }
      } else {
        //error del service firebase
        this.errorMessage = res.error?.message || res.message;
        console.error('Error en login:', this.errorMessage);
      }
    } catch (error: any) {
      // manejo personalizado errores
      const errorResponse = this._AuthResponseModel.signInFailed(error?.code || 'LOGIN_ERROR');
      this.errorMessage = errorResponse?.error?.message || 'Error en iniciar sesión. Comprueba usuario y contraseña.';
      console.error('Error inesperado en loginUser:', error);
    }
  }

  loginGoogle(){
    this._fireAuthService.signInGoogle();
  }

}
