import { StateMessageService } from './../../../shared/services/state-message.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthErrorMessages } from 'src/app/shared/model/errorsMessages';
import { FirebaseAuthErrorMap } from 'src/app/shared/model/fbAuthErrorMap';
import { ResponseData } from 'src/app/shared/model/responseData.model';
import { User } from 'src/app/shared/model/user.model';
import { AuthResponseModel } from 'src/app/shared/response/authResponse.model';
import { FireAuthService } from 'src/app/shared/services/fire-auth.service';
import { FireProfileService } from 'src/app/shared/services/fire-profile.service';
import { NormalizeService } from 'src/app/shared/services/normalize.service';
import { UserWithoutPassword } from 'src/app/shared/types/global.types';
import { RecoveryPasswordDialogComponent } from '../../components/recovery-password-dialog/recovery-password-dialog.component';
import { applyAnimationDisplay } from 'src/app/shared/helpers/applyAnimationDisplay';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, AfterViewInit {
  formlogin!: FormGroup;
  statusMessage: string = '';
  statusStyle: string = '';
  msgDialog: string = '';
  formDialog!: FormGroup;
  messageNavigation?: Record<string, string>;
  title: string = 'Olvidó la contraseña';
  elementMessage! : ElementRef;
  constructor(
    private readonly _fb:FormBuilder,
    private readonly _router:Router,
    private readonly _fireAuthService : FireAuthService,
    private readonly _AuthResponseModel: AuthResponseModel,
    private readonly _formalize: NormalizeService,
    private readonly _fireProfileService: FireProfileService,
    private readonly _dialog: MatDialog,
    private readonly _stateMessageNavigation: StateMessageService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.formlogin = this._fb.group({
      email:     ['',[Validators.required,Validators.email]],
      password:  ['', Validators.required],
    });
    this.formDialog = this._fb.group({
      email:     ['',[Validators.required,Validators.email]],
    });
  }
  ngAfterViewInit(): void {
    if(this.elementMessage){
      applyAnimationDisplay(this._renderer, this.elementMessage,  () => {});
    }
    this.messageNavigation = this._stateMessageNavigation.getMessage();
    this._cdr.detectChanges();
    console.log('Mensaje de navegación (después de la vista):', this.messageNavigation);
  }

  getElementStatus(ele: ElementRef){
    this.elementMessage = ele;
    console.log(this.elementMessage)
  }
  async loginUser(user: User): Promise<void> {
    if (this.formlogin.invalid) {
      this.statusMessage = 'Por favor, rellena todos los campos correctamente';
      this.statusStyle = 'error';
      return;
    }
    this.statusMessage = '';
    this.statusStyle = '';

    try {
      const res: ResponseData<UserWithoutPassword> = await this._fireAuthService.signIn(user);
      if (res.success && res.data) {
        await this._fireAuthService.getTokenFirebase(); // Token real de Firebase
        const navigationSuccess = await this._router.navigate(['/profile', res.data.id, 'list']);

        if (navigationSuccess) {
          this.statusMessage = 'Inicio de sesión exitoso';
          this.statusStyle = 'success';
        } else {
          this.statusMessage = 'Error de navegación al perfil. Verifica la conexión';
          this.statusStyle = 'error';
        }
      } else {
        this.statusMessage = res.error?.message || res.message;
        this.statusStyle = 'error';
        console.error('Error en login:', this.statusMessage);
      }
    } catch (error: any) {
      if (error?.code && FirebaseAuthErrorMap[error.code]) {
        this.statusMessage = FirebaseAuthErrorMap[error.code];
      } else {
        this.statusMessage = AuthErrorMessages.AUTH_ERROR;
      }
      this.statusStyle = 'error';
      console.error('Error inesperado en login:', error);
    }
  }

  async dialogRecoveryPassOpen(user: User):Promise<void>{
    const dialogRef = this._dialog.open(RecoveryPasswordDialogComponent,{
      width: '400px',
      data:{
        formGroupDialog: this.formDialog,
        msgDialog : this.msgDialog,
        statusStyle: this.statusStyle
      }});

    if (this.formDialog.invalid) {
      this.msgDialog = 'Por favor, rellena todos los campos correctamente';
      this.statusStyle = 'error';
    }
    this.msgDialog = '';
    this.statusStyle = '';
    try {
      const normalizeUser: User = this._formalize.normalizeForm(user);
      const res: ResponseData = await this._fireAuthService.generateNewPasswordWithMail(normalizeUser.email);
      if(res.success && res.data){
        this.statusMessage = res.data as string;
        this.statusStyle = 'success';
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Recuperación de contraseña enviada:', result);
            this.statusMessage = res.data as string;
            this.statusStyle = 'success';
          } else {
            console.log('El diálogo se cerró sin enviar datos.');
          }
        });

      } else {
        this.msgDialog = res.error?.message || res.message;
        this.statusStyle = 'error';
        console.error('Error en recuperacion de cuenta:', this.statusMessage);
      }
    } catch (error) {
      if (error?.code && FirebaseAuthErrorMap[error.code]) {
        this.msgDialog = FirebaseAuthErrorMap[error.code];
      }else{
        this.msgDialog = error.message;
      }
      this.statusStyle = 'error';
    }
  }
  async loginGoogle(): Promise<void> {
    this.statusMessage = '';
    try {
      await this._fireAuthService.signInGoogle();
    } catch (error: any) {
      if (error?.code && FirebaseAuthErrorMap[error.code]) {
        this.statusMessage = FirebaseAuthErrorMap[error.code];
      } else {
        this.statusMessage = AuthErrorMessages.AUTH_ERROR;
      }
      this.statusStyle = 'error';
      console.error('Error inesperado en login con Google:', error);
    }
  }

}
