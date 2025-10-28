import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/shared/model/responseData.model';
import { User } from 'src/app/shared/model/user.model';
import { AuthResponseModel } from 'src/app/shared/response/authResponse.model';
import { FireAuthService } from 'src/app/shared/services/fire-auth.service';
import { FireProfileService } from 'src/app/shared/services/fire-profile.service';

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
    private _AuthResponseModel: AuthResponseModel
  ) { }

  ngOnInit(): void {
    this.formRegister = this._fb.group({
      name :            ['', Validators.required],
      surname:          ['', Validators.required],
      email :           ['', [Validators.required, Validators.email]],
      password :        ['', [Validators.required]],
      confirmPassword : ['', [Validators.required,this.passwordValidator().bind(this)]],
      terms:            [false, [Validators.required,Validators.requiredTrue]],
    })
  }

  passwordValidator(): ValidatorFn {
    return (ctrl: AbstractControl): ValidationErrors | null =>
       this.formRegister?.get('password')?.value !== ctrl?.value?{mismatch: true}:null;
  }


  async registerUser(user:User){
    // Validar formulario antes de enviar
    if (this.formRegister.invalid) {
      this.errorMessage = 'Por favor, rellena todos los campos correctamente';
      return;
    }
    this.errorMessage = '';

    try {
      this.newUser = {
        name : user.name.trim(),
        surname : user.surname.trim(),
        email : user.email.trim().toLowerCase(),
        password : user.password.trim(),
        terms: user.terms == true ? true : false
      }

      const response:ResponseData<User> = await this._fireAuthService.register(this.newUser);

      if(response.success && response.data?.id){
        try {
          // Crear perfil en Firestore
          await this._fireProfileService.createUser(this.newUser, response.data.id);

          // Navegar al login
          const navigationSuccess = await this._router.navigate(['/login']);

          if (!navigationSuccess) {
            this.errorMessage = 'Registro exitoso, pero hubo un error al redirigir.';
            console.error('Error en la navegación después del registro');
          }
        } catch (error: any) {
          // Error al crear perfil en Firestore
          const errorResponse = this._AuthResponseModel.registerFailed(error?.code || 'PROFILE_CREATION_ERROR');
          this.errorMessage = errorResponse?.error?.message || 'Error al crear el perfil en la servidor';
          console.error('Error al crear perfil:', error);
        }
      } else {
        // Error del service de firebase
        this.errorMessage = response.error?.message || response.message;
        console.error('Error en registro:', this.errorMessage);
      }
    } catch (error: any) {
      // manejo personalizado errores
      const errorResponse = this._AuthResponseModel.registerFailed(error?.code || 'REGISTER_ERROR');
      this.errorMessage = errorResponse?.error?.message || 'Error al registrar. Verifica los datos e intenta nuevamente.';
      console.error('Error inesperado en registerUser:', error);
    }
  }
}
