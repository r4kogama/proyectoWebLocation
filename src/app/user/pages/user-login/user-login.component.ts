import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorMessages } from 'src/app/shared/model/errorsMessages';
import { FirebaseAuthErrorMap } from 'src/app/shared/model/fbAuthErrorMap';
import { ResponseData } from 'src/app/shared/model/responseData.model';
import { User } from 'src/app/shared/model/user.model';
import { AuthResponseModel } from 'src/app/shared/response/authResponse.model';
import { FireAuthService } from 'src/app/shared/services/fire-auth.service';
import { UserWithoutPassword } from 'src/app/shared/types/global.types';

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

  async loginUser(user:User): Promise<void>{
    if (this.formlogin.invalid) {
      this.errorMessage = 'Por favor, rellena todos los campos correctamente';
      return;
    }
    this.errorMessage = '';

    try {
      const res: ResponseData<UserWithoutPassword> = await this._fireAuthService.signIn(user);
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
      if (error?.code && FirebaseAuthErrorMap[error.code]) {
        this.errorMessage = FirebaseAuthErrorMap[error.code];
      }else{
        this.errorMessage = AuthErrorMessages.AUTH_ERROR;
      }
    }
  }

  loginGoogle(): Promise<void>{
    return this._fireAuthService.signInGoogle();
  }

}
