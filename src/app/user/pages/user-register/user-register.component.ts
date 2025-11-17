import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/shared/model/responseData.model';
import { User } from 'src/app/shared/model/user.model';
import { FireAuthService } from 'src/app/shared/services/fire-auth.service';
import { FireProfileService } from 'src/app/shared/services/fire-profile.service';
import { FirebaseAuthErrorMap } from 'src/app/shared/model/fbAuthErrorMap';
import { AuthErrorMessages } from 'src/app/shared/model/errorsMessages';
import { NormalizeService } from 'src/app/shared/services/normalize.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  formRegister! : FormGroup;
  errorMessage: string = '';
  newUser!:User;
  constructor(
    private _fb:FormBuilder,
    private _router:Router,
    private _fireAuthService: FireAuthService,
    private _fireProfileService: FireProfileService,
    private _formalize: NormalizeService
  ) { }

  ngOnInit(): void {
    this.formRegister = this._fb.group({
      name :            ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.maxLength(15)]],
      surname:          ['',],
      email :           ['', [Validators.required, Validators.email]],
      password :        ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required,this.passwordValidator().bind(this)]],
      terms:            [false, [Validators.required,Validators.requiredTrue]],
    })
  }

  passwordValidator(): ValidatorFn {
    return (ctrl: AbstractControl): ValidationErrors | null =>
       this.formRegister?.get('password')?.value !== ctrl?.value?{mismatch: true}:null;
  }


  async registerUser(user: User) {
    // Validar formulario antes de enviar
    if (this.formRegister.invalid) {
      this.errorMessage = 'Por favor, rellena todos los campos correctamente';
      return;
    }
    this.errorMessage = '';
    try {
      const normalizeUser = this._formalize.normalizeForm(user);
      const response: ResponseData<User> = await this._fireAuthService.signUp(normalizeUser);

      if (response.success && response.data?.id) {
        try {
          // Eliminar password
          const { password, ...userWithoutPassword } = response.data;
          await this._fireProfileService.saveUser(userWithoutPassword, response.data.id);
          const navigationSuccess = await this._router.navigate(['/login']);

          if (!navigationSuccess) {
            this.errorMessage = 'Registro exitoso, pero hubo un error al redirigir.';
            console.error('Error en la navegación después del registro');
          }
        } catch (error: any) {
          // Error al crear perfil en Firestore
          if (error?.code && FirebaseAuthErrorMap[error.code]) {
            this.errorMessage = FirebaseAuthErrorMap[error.code];
          }else{
            this.errorMessage = AuthErrorMessages.REGISTER_ERROR;
          }
          console.error('Error al crear perfil:', error);
        }
      } else {
        // Error del servicio de Firebase
        this.errorMessage = response.error?.message;
        console.error('Error en registro:', this.errorMessage);
      }
    } catch (error: any) {
      // Manejo personalizado de errores
      if (error?.code && FirebaseAuthErrorMap[error.code]) {
        this.errorMessage = FirebaseAuthErrorMap[error.code];
      }else{
        this.errorMessage = AuthErrorMessages.UNKNOWN_ERROR;
      }
    }
  }
}
