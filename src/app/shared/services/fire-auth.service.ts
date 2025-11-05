import { inject, Injectable } from '@angular/core'; //Auth y Firestore ya no son clases Angular con decoradores
import { Auth, getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getRedirectResult, signInWithRedirect, } from '@angular/fire/auth';
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { HttpResponseBuilder } from '../response/httpResponse.model';
import { ResponseData } from '../model/responseData.model';
import { AuthResponseModel } from '../response/authResponse.model';
import { AuthErrorMessages } from '../model/errorsMessages';
@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  private _auth: Auth = inject(Auth);
  private _fireStore: Firestore = inject(Firestore);
  private _getAuth: Auth = getAuth();



  constructor(
    private _httpResponseBuilder: HttpResponseBuilder,
    private _authResponseModel : AuthResponseModel
    ) {}


  async signIn(user: User): Promise<ResponseData<User>> {

    try {
      const credentials = await signInWithEmailAndPassword(this._auth, user.email, user.password);

      if (credentials.user) {
        const userData: User = {
          ...user,
          id: credentials.user.uid
        };
        return this._authResponseModel.signInSuccess(userData);
      }

      return this._authResponseModel.authNoUser();
    } catch (error: any) {
      const errorCode = error?.code || AuthErrorMessages.LOGIN_ERROR;
      return this._authResponseModel.signInFailed(errorCode);
    }
  }
  async signOut(): Promise<ResponseData<void>> {
    try {
      await signOut(this._auth);
      sessionStorage.removeItem('accessToken');
      return this._authResponseModel.logoutSuccess();
    } catch (error: any) {
      const errorCode = error?.code || AuthErrorMessages.LOGOUT_ERROR;
      return this._authResponseModel.signOutFailed(errorCode);
    }
  }

  async register(user: User): Promise<ResponseData<User>> {
    try {
      const credentials = await createUserWithEmailAndPassword(this._auth, user.email, user.password);

      if (credentials.user) {
        // Opcional: actualizar perfil del usuario
        // await credentials.user.updateProfile({
        //  displayName: user.name + ' ' + user.surname,
        //  photoURL: 'http://mifoto.com'
        //});

        const userData: User = {
          ...user,
          id: credentials.user.uid
        };

        return this._authResponseModel.registerSuccess(userData);
      }

      return this._authResponseModel.authNoUser();
    } catch (error: any) {
      const errorCode = error?.code || AuthErrorMessages.REGISTER_ERROR;
      return this._authResponseModel.registerFailed(errorCode);
    }
  }
  setToken(id:string, token: string):void{
    sessionStorage.setItem(id, token);
  }
  getToken():string{
    return sessionStorage.getItem('accessToken') as string;
  }

}
