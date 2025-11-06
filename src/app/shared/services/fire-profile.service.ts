import { inject, Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../model/user.model';
import { FireAuthService } from './fire-auth.service';

const USERS_COLLECTION: string = 'geousers';

@Injectable({
  providedIn: 'root'
})
export class FireProfileService {
  private _fireStore : Firestore = inject(Firestore);
  constructor( private _authFireService: FireAuthService) { }

  createUser(user:User, id_user:string): Promise<void>{
    const userRef = doc(collection(this._fireStore, USERS_COLLECTION), id_user);// doc() referencia al documento
    return setDoc(userRef, user);//setdoc() save/write
  }

  getUserById$(id_user:string):Observable<any>{
    const userRefId = doc(this._fireStore, `${USERS_COLLECTION}/${id_user}`);
    return  docData(userRefId).pipe(first());// docData() emite contenido del documento
  }
}
