import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { FireAuthService } from 'src/app/shared/services/fire-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  formlogin!: FormGroup;
  constructor( private _fb:FormBuilder,
               private _router:Router,
               private _fireAuthService : FireAuthService
               ) {

               }



  async loginUser(user:User){
    try{
      const res = await  this._fireAuthService.login(user);
      this._fireAuthService.setToken(res.user.uid, res.user.Aa);//id y tokens
      //obtenido el token y el id, navega al perfil con el id del usuario del
      this._router.navigate(['/profile',res.user.uid,'list'])
    }catch(err){
      console.error(err);
      console.log((err as Error).message);
    }
  }

  ngOnInit(): void {
    this.formlogin = this._fb.group({
      email:     ['',[Validators.required,Validators.email]],
      password:  ['', Validators.required],
    });
  }


}
