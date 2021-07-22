import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../commons/commons.module';



@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    FormRegisterComponent,
    FormLoginComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    CommonsModule
  ],
  exports: [
    UserLoginComponent,
    UserRegisterComponent,
    FormRegisterComponent,
    FormLoginComponent,

  ]
})
export class UserModule { }
