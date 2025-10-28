import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { FireProfileService } from 'src/app/shared/services/fire-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error!: any;
  updateFormPersonal!: FormGroup;
  dataUser!:User;
  constructor(private _route: ActivatedRoute, private _fireProfileService: FireProfileService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.updateFormPersonal = this._fb.group({
      name:     [''],
      surname:  [''],
      email:    ['', [Validators.email]]
    })

    this._route.paramMap.subscribe((params: Params) => {
      console.log(params.get('id'));
      this._fireProfileService.getUserById$(params.get('id'))
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



/* if(data.Aa !==''){
              this.formGroup = this.fb.group(
                {
                  name: data.displayName,
                  surname: data.displayName,
                  email: data.email,
                }
              )
            }else{
              this.router.navigate(['/login']);
            } */

  updateProfile(user: User){

  }

}
