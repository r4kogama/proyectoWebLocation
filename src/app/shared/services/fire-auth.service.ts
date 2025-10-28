import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { HttpResponseBuilder } from '../response/httpResponse.model';
import { ResponseData } from '../model/responseData.model';
import { AuthResponseModel } from '../response/authResponse.model';
import { AuthErrorMessages } from '../model/errorsMessages';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {


  constructor(
    private _fireAuth: AngularFireAuth,
    private _fireStore: AngularFirestore,
    private _httpResponseBuilder: HttpResponseBuilder,
    private _authResponseModel : AuthResponseModel
    ) {}

  async signIn(user: User): Promise<ResponseData<User>> {
    try {
      const credentials = await this._fireAuth.signInWithEmailAndPassword(user.email, user.password);

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
      await this._fireAuth.signOut();
      sessionStorage.removeItem('accessToken');
      return this._authResponseModel.logoutSuccess();
    } catch (error: any) {
      const errorCode = error?.code || AuthErrorMessages.LOGOUT_ERROR;
      return this._authResponseModel.signOutFailed(errorCode);
    }
  }

  async register(user: User): Promise<ResponseData<User>> {
    try {
      const credentials = await this._fireAuth.createUserWithEmailAndPassword(user.email, user.password);

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
  setToken(id:string,token: string):void{
    sessionStorage.setItem(id,token);
  }
  getToken():string{
    return sessionStorage.getItem('accessToken') as string;
  }

}
