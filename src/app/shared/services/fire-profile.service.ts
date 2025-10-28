import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/internal/operators/first';
import { User } from '../model/user.model';
import { FireAuthService } from './fire-auth.service';

const USERS_COLLECTION:string = 'geousers';

@Injectable({
  providedIn: 'root'
})
export class FireProfileService {
  constructor(private _firestore:AngularFirestore, private _authFireService: FireAuthService) { }

  createUser(user:User, id_user:string): Promise<void>{
    return this._firestore.collection(USERS_COLLECTION).doc(id_user).set(user);
  }

  getUserById$(id_user:string):Observable<any>{
    return  this._firestore.collection<User>(USERS_COLLECTION).doc(id_user).valueChanges().pipe(first());
  }
}
