import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { FireAuthService } from 'src/app/shared/services/fire-auth.service';
import { FireProfileService } from 'src/app/shared/services/fire-profile.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  formRegister! : FormGroup;
  constructor(
    private _fb:FormBuilder,
    private _router:Router,
    private _fireAuthService: FireAuthService,
    private _fireProfileService: FireProfileService) { }

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

  newUser!:any;
  async registerUser(user:User){
     this.newUser = {
      name : user.name.trim(),
      surname : user.surname.trim(),
      email : user.email.trim().toLowerCase(),
      password : user.password.trim(),
      terms: user.terms == true ? 1 : 0
    }
      const id_user = await this._fireAuthService.register(this.newUser);
      this._fireProfileService.createUser(this.newUser, id_user);
      this._router.navigate(['/login'])
  }
}
