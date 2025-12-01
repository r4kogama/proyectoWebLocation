import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { FireAuthService } from 'src/app/shared/services/fire-auth.service';
import { FireProfileService } from 'src/app/shared/services/fire-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error!: any;
  formUpdateProfile!: FormGroup;
  formAuthProfile!: FormGroup;
  formDeleteProfile!: FormGroup;
  dataUser!:User;
  constructor(
     private _route: ActivatedRoute,
     private _fireProfileService: FireProfileService,
     private _fireAuthService: FireAuthService,
     private _fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.formUpdateProfile = this._fb.group({
      name:     ['',[Validators.pattern(/^[A-Za-z\s]+$/),Validators.maxLength(15)]],
      surname:  ['',[Validators.maxLength(50)]],
      email:    ['',[Validators.email]]
    })
    this.formAuthProfile = this._fb.group({
      password : ['', [Validators.required, Validators.minLength(6)]],
    })
    this.formDeleteProfile = this._fb.group({
      password : ['', [Validators.required, Validators.minLength(6)]],
    })

    this._route.paramMap.subscribe((params: Params) => {
      console.log(params.get('id'));
      this._fireProfileService.userById$(params.get('id'))
        .subscribe((data:User) => {
          console.log("data user");
          this.dataUser = data;
          console.log(this.dataUser);
        },
          (error:string) => {
            console.log(error);
          })

    })
  }

  logOutProfile(){
  this._fireAuthService.signOut();
  }

  updateProfile(user:User){

  }

  updatePassword(user: User){
      console.log('Eliminar perfil:', user);
  }
  deleteProfile(user: User){
    console.log('Actualizar contraseña:', user);
  }


}
