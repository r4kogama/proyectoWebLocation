import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons.module';
import { FooterComponent } from '../commons/footer/footer.component';
import { FormNormalizePipe } from '../shared/pipes/form-normalize.pipe';
import { RecoveryPasswordDialogComponent } from './components/recovery-password-dialog/recovery-password-dialog.component';
import { PushNotificationComponent } from '../commons/push-notification/push-notification.component';
import { NgxParticlesModule } from '@tsparticles/angular';



@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    FormRegisterComponent,
    FormLoginComponent,
    FormNormalizePipe,
    RecoveryPasswordDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    CommonsModule,
    NgxParticlesModule
  ],
  exports: [
    FooterComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FormRegisterComponent,
    FormLoginComponent,
    RecoveryPasswordDialogComponent,
    FormNormalizePipe,
    PushNotificationComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class UserModule { }
