import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData } from '@/shared/model/responseData.model';
import { User } from '@/shared/model/user.model';
import { FireAuthService } from '@/shared/services/fire-auth.service';
import { FireProfileService } from '@/shared/services/fire-profile.service';
import { getFirebaseErrorMessage } from '@/shared/model/fbAuthErrorMap';
import { AuthErrorMessages } from '@/shared/model/errorsMessages';
import { NormalizeService } from '@/shared/services/normalize.service';
import { StateMessageService } from '@/shared/services/state-message.service';
import { SuccessMessages } from '@/shared/model/successMessages';
import { ParticulesConfigService } from '@/shared/services/particules-config.service';
import { Container } from '@tsparticles/engine';
import { setNote } from '@/shared/helpers/notification.helper';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
// SMART COMPONENT: Maneja estado, lógica de negocio y control de partículas
export class UserRegisterComponent implements OnInit, OnDestroy {
  formRegister! : FormGroup;
  newUser!:User;
  particlesOptions : any ;
  noteError?: Record<string, string> | null;
  noteSuccess?: Record<string, string> | null;
  multiple: string = 'particles-multiple';
  private _container: Container | null = null;

  constructor(
    private readonly _fb:FormBuilder,
    private readonly _router:Router,
    private readonly _fireAuthService: FireAuthService,
    private readonly _fireProfileService: FireProfileService,
    private readonly _formalize: NormalizeService,
    private readonly _stateMessageNavigation : StateMessageService,
    private readonly _particulesConfigService : ParticulesConfigService,
    private readonly _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._particulesConfigService.initEngine().then(() => {});
    this.particlesOptions = this._particulesConfigService.getMultipleCannonConfig();

    this.formRegister = this._fb.group({
      name :            ['', [Validators.pattern(/^[A-Za-z\s]+$/), Validators.maxLength(15)]],
      surname:          ['',],
      email :           ['', [ ]],
      password :        ['', [ ]],
      confirmPassword : ['', [this.passwordValidator().bind(this)]],
      terms:            [false, []],
      /* name :            ['', [Validators.pattern(/^[A-Za-z\s]+$/), Validators.maxLength(15)]],
      surname:          ['',],
      email :           ['', [Validators.required, Validators.email]],
      password :        ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required,this.passwordValidator().bind(this)]],
      terms:            [false, [Validators.required,Validators.requiredTrue]],*/
    });
  }

  ngOnDestroy(): void {
    if (this._container) {
      this._container.stop();
      this._container.destroy();
      this._container = null;
    }
  }

  onParticlesLoaded(confetti: Container): void {
    this._container = confetti;
    if (this._container) {
      this._container.pause();
    }
  }

  private playParticles(): void {
    if (this._container) {
      this._container.refresh();
      this._container.play();
    }
  }

  passwordValidator(): ValidatorFn {
    return (ctrl: AbstractControl): ValidationErrors | null =>
       this.formRegister?.get('password')?.value === ctrl?.value?null:{mismatch: true};
  }

  async registerUser(user: User): Promise<void> {
    this.resetNotifications();
    if(!this.isFormRegisterValid(user)){ return;}
    const normalizeUser: User = this._formalize.normalizeForm(user);
    if(!await this.isUserExists(normalizeUser)){ return;}
    try {
      const response: ResponseData<User> = await this._fireAuthService.signUp(normalizeUser);
      if (response.success && response.data?.id) {
        try {
          this.playParticles();
          // Eliminar password y confirmar password
          await this.handleSaveUser(response);
          const saveStore: boolean = this._stateMessageNavigation.isSetMessage(SuccessMessages.EMAIL_CONFIRM, 'success');
          if(!saveStore){
            console.log('Mensaje de navegacion no salvado.');
          }
          this.noteSuccess = setNote(response.message, 'success');
          this.handleNavigationAfterParticles(5000);
        } catch (error: any) {
          this.showError(error);
        }
      } else {
        this.showError(response.error);
      }
    } catch (error: any) {
      this.showError(error);
    }
  }


  private async isUserExists(user: User): Promise<boolean> {
    try {
      const userExists: User[] = await this._fireProfileService.userByEmail(user.email);
      return userExists.length > 0;
    } catch (error) {
      this.showError(error);
      return false;
    }
  }

  private isFormRegisterValid(user: User): boolean {
    this.noteError = null;
    if (!user.email || !user.name || !user.terms || this.formRegister.invalid) {
      this.showError(AuthErrorMessages.EMPTY_INPUT);
      return false;
    }
    return true;
  }

  private async handleSaveUser(response: ResponseData<User>): Promise<void> {
    const { password, confirmPassword, ...userWithoutPassword } = response.data;
    await this._fireProfileService.saveUser(userWithoutPassword, response.data.id);
  }

  private handleNavigationAfterParticles(time: number): void {
    this._particulesConfigService.activateDelay$(time).subscribe(async (canNavigate) => {
      if (canNavigate) {
        const navigationSuccess: boolean = await this._router.navigate(['/login']);
        if (!navigationSuccess) {
          this.noteSuccess = setNote(SuccessMessages.REGISTER_NO_NAVIGATION, 'success');
        }
      }
    });
  }

  private resetNotifications(): void {
    this.noteError = null;
    this.noteSuccess = null;
  }

  private async showError(error: any): Promise<void> {
    this.noteError = null;
    const result = await getFirebaseErrorMessage(error);
    this.noteError = setNote(result, 'error');
  }

}
