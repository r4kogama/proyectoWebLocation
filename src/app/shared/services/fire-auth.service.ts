import { inject, Injectable } from '@angular/core'; //Auth y Firestore ya no son clases Angular con decoradores
import { Auth, getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { HttpResponseBuilder } from '../response/httpResponse.model';
import { ResponseData } from '../model/responseData.model';
import { AuthResponseModel } from '../response/authResponse.model';
import { AuthErrorMessages } from '../model/errorsMessages';
import { mapFireBaseUserToUser} from '../helpers/mapperUser.helper';
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
      const errorCode: string = error?.code || AuthErrorMessages.LOGIN_ERROR;
      return this._authResponseModel.signInFailed(errorCode);
    }
  }
  async signOut(): Promise<ResponseData<void>> {
    try {
      await signOut(this._auth);
      sessionStorage.removeItem('accessToken');
      return this._authResponseModel.logoutSuccess();
    } catch (error: any) {
      const errorCode: string = error?.code || AuthErrorMessages.LOGOUT_ERROR;
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
