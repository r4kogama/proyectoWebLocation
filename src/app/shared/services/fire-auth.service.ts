import { inject, Injectable } from '@angular/core'; //Auth y Firestore ya no son clases Angular con decoradores
import { Auth, getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, getFirestore, Timestamp, serverTimestamp } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { HttpResponseBuilder } from '../response/httpResponse.model';
import { ResponseData } from '../model/responseData.model';
import { AuthResponseModel } from '../response/authResponse.model';
import { AuthErrorMessages } from '../model/errorsMessages';
import { mapFireBaseUserToUser} from '../helpers/mapperUser.helper';
import { UserWithoutPassword } from '../types/global.types';
@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  private _auth: Auth = inject(Auth);
  private _fireStore: Firestore = inject(Firestore);
  private _getAuth: Auth = getAuth();


  constructor(
    private _httpResponseBuilder: HttpResponseBuilder,
    private _authResponseModel : AuthResponseModel,
    private _router: Router
    ) {}

  async signIn(user: User): Promise<ResponseData<UserWithoutPassword>> {
    try {
      const credentials = await signInWithEmailAndPassword(this._auth, user.email, user.password);

      if (credentials.user) {
        const { password, ...userWithoutPassword } = user;
        const userCopy: UserWithoutPassword = {
          ...userWithoutPassword,
          id: credentials.user.uid
        };
        return this._authResponseModel.signInSuccess(userCopy);
      }

      return this._authResponseModel.authNoUser();
    } catch (error: any) {
      const errorCode: string = error?.code || AuthErrorMessages.LOGIN_ERROR;
      return this._authResponseModel.signInFailed(errorCode);
    }
  }
  async signOut(): Promise<ResponseData<void>> {
    try {
      await signOut(this._auth);
      sessionStorage.removeItem('accessToken');
      return this._authResponseModel.logOutSuccess();
    } catch (error: any) {
      const errorCode: string = error?.code || AuthErrorMessages.LOGOUT_ERROR;
      return this._authResponseModel.signOutFailed(errorCode);
    }
  }


  async signUp(user: User): Promise<ResponseData<User>> {
    try {
      const credentials = await createUserWithEmailAndPassword(this._auth, user.email, user.password);

      if (credentials.user) {
        // Crear una copia del objeto user para evitar mutaciones
        const userCopy: User = {
          ...user,
          id: credentials.user.uid,
          provider: 'email',
          createdAt: serverTimestamp() // Asignar fecha formato firebase
        };

        return this._authResponseModel.registerSuccess(userCopy);
      }

      return this._authResponseModel.authNoUser();
    } catch (error: any) {
      const errorCode: string = error?.code || AuthErrorMessages.REGISTER_ERROR;
      return this._authResponseModel.registerFailed(errorCode);
    }
  }

  //iniciar popup
  async signInGoogle():Promise<void>{
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      provider.setCustomParameters({
        'prompt': 'select_account',
        'access_type': 'offline',
        'response_type': 'code'
      });
      this.setToken('auth_popup_provider', 'google');
      const result = await signInWithPopup(this._auth, provider);

      // Procesar resultado del popup
      if (!result || !result.user) {
        this._authResponseModel.signInProviderFailed(AuthErrorMessages.LOGIN_PROVIDER_ERROR);
        return;
      }

      const credentials: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
      if (!credentials?.accessToken) {
        this._authResponseModel.authNoToken();
        return;
      }

      this.setToken('accessToken', credentials.accessToken);
      const mapperUser = mapFireBaseUserToUser(result.user, 'google');
      this._authResponseModel.signInSuccess(mapperUser);

      // Navegar al perfil
      try {
        await this._router.navigate([`/profile/${mapperUser.id}`], { state: { user: mapperUser } });
      } catch (navErr) {
        console.error('Error en la navegación al perfil', navErr);
      }
    }catch(error : any){
      const errorCode: string = error?.code || AuthErrorMessages.ERROR_REDIRECT;
      this._authResponseModel.signInProviderFailed(errorCode);
      console.error('Error al iniciar popup:', error)
    }
  }


  setToken(id:string, token: string) :void{
    sessionStorage.setItem(id, token);
  }
  getToken() :string{
    return sessionStorage.getItem('accessToken') as string;
  }
  hasToken() :boolean{
    return !!sessionStorage.getItem('accessToken');
  }
  removeToken(id: string) :void{
    sessionStorage.removeItem(id);
  }

}
