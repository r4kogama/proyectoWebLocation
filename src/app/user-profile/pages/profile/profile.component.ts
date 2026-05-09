import { setNote } from '@/shared/helpers/notification.helper';
import { getFirebaseErrorMessage } from '@/shared/model/fbAuthErrorMap';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '@/shared/model/user.model';
import { FireAuthService } from '@/shared/services/fire-auth.service';
import { FireProfileService } from '@/shared/services/fire-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  formUpdateProfile!: FormGroup;
  formAuthProfile!: FormGroup;
  formDeleteProfile!: FormGroup;
  dataUser!:User;
  noteError?: Record<string, string>;
  constructor(
     private readonly _route: ActivatedRoute,
     private readonly _fireProfileService: FireProfileService,
     private readonly _fireAuthService: FireAuthService,
     private readonly _fb: FormBuilder
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

  async logOutProfile(){
    try {
      await this._fireAuthService.signOut();
    } catch (error: any) {
      this.showError(error);
    }
  }

  updateProfile(user:User){

  }

  updatePassword(user: User){
      console.log('Eliminar perfil:', user);
  }
  deleteProfile(user: User){
    console.log('Actualizar contraseña:', user);
  }

  private async showError(error: any): Promise<void> {
    this.noteError = null;
    const result = await getFirebaseErrorMessage(error);
    this.noteError = setNote(result, 'error');
  }
}
