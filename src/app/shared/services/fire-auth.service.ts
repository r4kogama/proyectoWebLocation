import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(private _fireAuth: AngularFireAuth,
    private _fireStore: AngularFirestore) { }

  async login(user:User):Promise<any>{
    return await this._fireAuth.signInWithEmailAndPassword(user.email, user.password);

  }

  logout(){
    this._fireAuth.signOut()
    .then( ()=> {
    })
    .catch(( )=>{

    })
  }
  async register(user:User):Promise<any>{
    await this._fireAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then( (currentUser) => {
     /*   credentials.user?.updateProfile({
            displayName: user.name +' '+user.surname,
            photoURL:'http://mifoto.com'
          })  */
      user.id = currentUser.user?.uid;
      return user.id;
    })
    .catch( ( err) => {
      console.error(' error create User', err.message)
    })
  }

  setToken(id:string,token:any):void{
    sessionStorage.setItem(id,token);
  }
  getToken():string{
    return sessionStorage.getItem('accessToken') as string;
  }

}
