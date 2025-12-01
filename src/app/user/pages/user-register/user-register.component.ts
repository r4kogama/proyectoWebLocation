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
import { StateMessageService } from 'src/app/shared/services/state-message.service';
import { SuccessMessages } from 'src/app/shared/model/successMessages';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  formRegister! : FormGroup;
  statusMessage: string = '';
  statusStyle: string = '';
  newUser!:User;
  constructor(
    private _fb:FormBuilder,
    private _router:Router,
    private _fireAuthService: FireAuthService,
    private _fireProfileService: FireProfileService,
    private _formalize: NormalizeService,
    private _stateMessageNavigation : StateMessageService
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


  async registerUser(user: User): Promise<void> {
    // Validar formulario antes de enviar
    if (this.formRegister.invalid) {
      this.statusMessage = 'Por favor, rellena todos los campos correctamente';
      this.statusStyle = 'error';
      return;
    }
    this.statusMessage = '';
    this.statusStyle = '';
    try {
      const normalizeUser: User = this._formalize.normalizeForm(user);
      //si existe el email cancela el registro
      const userExists: User[] = await this._fireProfileService.userByEmail(normalizeUser.email);
      if (userExists.length > 0) {
        this.statusMessage = AuthErrorMessages.EMAIL_ALREADY_EXISTS;
        this.statusStyle = 'error';
        return;
      }
      const response: ResponseData<User> = await this._fireAuthService.signUp(normalizeUser);
      if (response.success && response.data?.id) {
        try {
          // Eliminar password y confirmar password
          const { password, confirmPassword, ...userWithoutPassword } = response.data;
          await this._fireProfileService.saveUser(userWithoutPassword, response.data.id);
          //mensaje guardado en session para la redireccion
          this._stateMessageNavigation.setMessage(SuccessMessages.REGISTER_SUCCESS, 'success');
          const navigationSuccess: boolean = await this._router.navigate(['/login']);

          if (!navigationSuccess) {
            this.statusMessage = 'Registro exitoso, pero hubo un error al redirigir.';
            this.statusStyle = 'success';
          }
        } catch (error: any) {
          // Error al crear perfil en Firestore
          if (error?.code && FirebaseAuthErrorMap[error.code]) {
            this.statusMessage = FirebaseAuthErrorMap[error.code];
          }else{
            this.statusMessage = AuthErrorMessages.REGISTER_ERROR;
          }
          this.statusStyle = 'error';
        }
      } else {
        // Error del servicio de Firebase
        this.statusMessage = response.error?.message;
        this.statusStyle = 'error';
      }
    } catch (error: any) {
      // Manejo personalizado de errores
      if (error?.code && FirebaseAuthErrorMap[error.code]) {
        this.statusMessage = FirebaseAuthErrorMap[error.code];
      }else{
        this.statusMessage = AuthErrorMessages.UNKNOWN_ERROR;
      }
      this.statusStyle = 'error';
    }
  }
}
