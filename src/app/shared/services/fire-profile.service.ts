import { inject, Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, docData, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
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
  // getUserById -> su uso esta reinstrigido para admin solo para informacion adicional del firestore
  //  que no esta disponible en Firebase Authentication.
  private _getUserById$(id_user: string): Observable<any> {
    const userRefId = doc(this._fireStore, `${USERS_COLLECTION}/${id_user}`);
    return docData(userRefId).pipe(first()); // docData() emite contenido del documento
  }
  //getUserByEmail-> buscar usuarios con correo electrónico identico  en Firestore.
  private async _getUserByEmail(email: string): Promise<any> {
    const usersCollection = collection(this._fireStore, USERS_COLLECTION);
    const emailQuery = query(usersCollection, where('email', '==', email));
    const snapshot = await getDocs(emailQuery); // Espera a que se resuelva la consulta
    return snapshot.docs.map((e) => (
        { id: e.id, ...e.data() }
    ))};// Convierte los documentos en un array

  // getters metodos admin privados
  get userById$(): (id_user: string) => Observable<any> {
    return this._getUserById$.bind(this);
  }

  get userByEmail(): (email: string) => Promise<any> {
    return this._getUserByEmail.bind(this);
  }
}
