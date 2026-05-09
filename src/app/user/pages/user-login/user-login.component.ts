import { StateMessageService } from './../../../shared/services/state-message.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthErrorMessages } from '@/shared/model/errorsMessages';
import { getFirebaseErrorMessage } from '@/shared/model/fbAuthErrorMap';
import { ResponseData } from '@/shared/model/responseData.model';
import { User } from '@/shared/model/user.model';
import { AuthResponseModel } from '@/shared/response/authResponse.model';
import { FireAuthService } from '@/shared/services/fire-auth.service';
import { FireProfileService } from '@/shared/services/fire-profile.service';
import { NormalizeService } from '@/shared/services/normalize.service';
import { UserWithoutPassword } from '@/shared/types/global.types';
import { RecoveryPasswordDialogComponent } from '../../components/recovery-password-dialog/recovery-password-dialog.component';
import { applyAnimationDisplay } from '@/shared/helpers/applyAnimationDisplay';
import { setNote } from '@/shared/helpers/notification.helper';
import { SuccessMessages } from '@/shared/model/successMessages';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, AfterViewInit {
  formlogin!: FormGroup;
  formDialog!: FormGroup;
  noteError?: Record<string, string>;
  noteSuccess?: Record<string, string>;
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
    this.noteSuccess = this._stateMessageNavigation.getMessage();
    this._cdr.detectChanges();
  }

  getNotificactionStatus(ele: ElementRef){
    this.elementMessage = ele;
  }

  async loginUser(user: User): Promise<void> {
    if (!this.isFormLoginValid) { return; }
    try {
      const res: ResponseData<UserWithoutPassword> = await this._fireAuthService.signIn(user);
      if (res.success && res.data) {
        try {
          const token$: Observable<string> = this._fireAuthService.getTokenFirebase$(); // Token real de Firebase
          const token: string = await firstValueFrom(token$);
          this._fireAuthService.setTokenProvider('accessToken', token);
          this._stateMessageNavigation.isSetMessage(SuccessMessages.LOGIN_SUCCESS, 'success');
          await this._router.navigate(['/profile', res.data.id, 'list']);
        } catch (error: any) {
          this.showError(error);
        }
      } else {
        this.showError(res.error);
      }
    } catch (error: any) {
      this.showError(error);
    }
  }
  setTokenProvider() {
    throw new Error('Method not implemented.');
  }

  async dialogRecoveryPassOpen(user: User):Promise<void>{
    const dialogRef = this._dialog.open(RecoveryPasswordDialogComponent,{
      width: '400px',
      data:{
        formGroupDialog: this.formDialog,
        notificationPush : this.noteSuccess,
        messageError : this.noteError,
      }});
    this.noteSuccess = {};
    if(!this.isFormRecoveryValid(user)){ return; }
    try {
      const normalizeUser: User = this._formalize.normalizeForm(user);
      const res: ResponseData = await this._fireAuthService.generateNewPasswordWithMail(normalizeUser.email);
      if(res.success && res.data){
        this.noteSuccess = setNote(res.data as string, 'success')
        dialogRef.afterClosed().subscribe((result) => {
          if(result === 'success'){
            this.noteSuccess = setNote( SuccessMessages.EMAIL_RECOVERY, 'success')
            console.log('Recuperación de contraseña enviada:', result);
          }
        });
      } else {
        this.showError(res.error);
      }
    }catch (error: any) {
      this.showError(error);
    }
  }



  async loginGoogle(): Promise<void> {
    try {
      await this._fireAuthService.signInGoogle();
    } catch (error: any) {
      this.showError(error || 'Error desconocido en login con Google')
      console.error('Error en login con Google:', error);
    }
  }


  private isFormRecoveryValid(user: User): boolean {
    this.noteError = null;
    if (this.formDialog.invalid || !user.email) {
      this.showError(AuthErrorMessages.CURRENT_EMAIL);
      return false;
    }
    return true;
  }


  private isFormLoginValid(user: User): boolean {
    this.noteError = null;
    if (this.formlogin.invalid ||  !user.email || !user.password) {
      this.showError(AuthErrorMessages.EMPTY_INPUT);
      return false;
    }
    return true;
  }

  private async showError(error: any): Promise<void> {
    this.noteError = null;
    const result = await getFirebaseErrorMessage(error);
    this.noteError = setNote(result, 'error');
  }
}
