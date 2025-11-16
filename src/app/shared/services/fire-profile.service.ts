import { inject, Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../model/user.model';
import { FireAuthService } from './fire-auth.service';
import { UserWithoutPassword } from '../types/global.types';

const USERS_COLLECTION: string = 'users';

@Injectable({
  providedIn: 'root'
})
export class FireProfileService {
  private _fireStore : Firestore = inject(Firestore);
  constructor( private _authFireService: FireAuthService) { }

  saveUser(user: UserWithoutPassword, id_user: string): Promise<void> {
    const userRef = doc(collection(this._fireStore, USERS_COLLECTION), id_user);
    return setDoc(userRef, user); // Guardar el usuario sin el campo password
  }

  getUserById$(id_user:string):Observable<any>{
    const userRefId = doc(this._fireStore, `${USERS_COLLECTION}/${id_user}`);
    return  docData(userRefId).pipe(first());// docData() emite contenido del documento
  }
}
