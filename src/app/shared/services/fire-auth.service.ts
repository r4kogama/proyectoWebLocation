import { inject, Injectable } from '@angular/core'; //Auth y Firestore ya no son clases Angular con decoradores
import { Auth, getAuth, User as FirebaseUser, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthCredential, sendPasswordResetEmail, sendEmailVerification, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, getFirestore, Timestamp, serverTimestamp } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { HttpResponseBuilder } from '../response/httpResponse.model';
import { ResponseData } from '../model/responseData.model';
import { AuthResponseModel } from '../response/authResponse.model';
import { mapFireBaseUserToUser } from '../helpers/mapperUser.helper';
import { UserWithoutPassword } from '../types/global.types';
import { Observable, firstValueFrom  } from 'rxjs';
import { AuthErrorMessages } from '../model/errorsMessages';
import { FireProfileService } from './fire-profile.service';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  private readonly _auth: Auth = inject(Auth);
  private readonly _fireStore: Firestore = inject(Firestore);
  private readonly _getAuth: Auth = getAuth();


  constructor(
    private readonly _httpResponseBuilder: HttpResponseBuilder,
    private readonly _authResponseModel : AuthResponseModel,
    private readonly _fireProfileService : FireProfileService,
    private readonly _router: Router
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
      throw error;
    }
  }

  async signOut(): Promise<ResponseData<void>> {
    try {
      await signOut(this._auth);
      this.removeTokenProvider('accessToken');
      return this._authResponseModel.logOutSuccess();
    } catch (error: any) {
      throw error;
    }
  }


  async signUp(user: User): Promise<ResponseData<User>> {
    try {
      const credentials = await createUserWithEmailAndPassword(this._auth, user.email, user.password);
      if (credentials.user) {
        await sendEmailVerification(credentials.user);
        // Crear una copia del objeto user para evitar mutaciones
        const userCopy: User = {
          ...user,
          id: credentials.user.uid,
          provider: 'email',
          createdAt: serverTimestamp() // Asignar fecha formato firebase
        };
        return this._authResponseModel.registerSuccess(userCopy);
      } else {
        return this._authResponseModel.authNoUser();
      }
    } catch (error: any) {
      throw error;
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
      const userGoogle: UserCredential = await signInWithPopup(this._auth, provider);
      if(await this._isUserExists(userGoogle)){ throw new Error(AuthErrorMessages.EMAIL_PROVIDER_IN_USE) ;}

      const credentials: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(userGoogle);
      if (!credentials?.accessToken) {
        throw new Error(AuthErrorMessages.AUTH_NO_TOKEN);
      }
      const mapperUser = mapFireBaseUserToUser(userGoogle.user, 'google');
      this.setTokenProvider('accessToken', credentials.accessToken);
      this._fireProfileService.saveUser(mapperUser, mapperUser.id);
      // Navegar al perfil
      await this._router.navigate([`/profile/${mapperUser.id}`], { state: { user: mapperUser } });
    }catch(error : any){
      console.error('Error al iniciar popup:', error)
      throw error;
    }
  }

  private async _isUserExists(userGoogle: UserCredential): Promise<boolean> {
    const existEmail = await this._fireProfileService.userByEmail(userGoogle.user.email);
    if(existEmail){
      await userGoogle.user.delete();
      return true;
    }
    return false;
  }

  async generateNewPasswordWithMail(email?: string): Promise<ResponseData> {
    const actionCodeSettings = {
      url: 'https://findlyapp.vercel.app/login',
      handleCodeInApp: true, // Abre el enlace en la misma aplicación
    };
    try {
      const observerUserAuth$: Observable<User> = this.getCurrentUser$();
      const currentUserAuth: User = await firstValueFrom(observerUserAuth$);
      if (!currentUserAuth?.email) {
        throw new Error('No se pudo obtener el correo del usuario actual.');
      }

      if (email !== currentUserAuth.email) {
        return this._authResponseModel.authNoEmail();
      }
      await sendPasswordResetEmail(this._auth, email, actionCodeSettings);
      return this._authResponseModel.passwordResetSuccess(`Enlace de recuperación de contraseña enviado a ${email}`);
    } catch (error) {
       throw error;
    }
  }

  //datos del usuario actual
  getCurrentUser$(): Observable<User | null> {
    return new Observable((observer) => {
      const unsubscribe = this._auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          const user: User = mapFireBaseUserToUser(firebaseUser);
          observer.next(user);
        } else {
          observer.next(null);
        }
        observer.complete();
      }, (error) => {
        observer.error(error);
      });

      // Cleanup subscription when the observable is unsubscribed
      return () => unsubscribe();
    });
  }

    /** Devuelve el token Firebase como Observable. Si no hay usuario, emite un error.
     Si hay usuario, emite el token o error si getIdToken falla.*/
  getTokenFirebase$(): Observable<string> {
    return new Observable((observer) => {
      const user: FirebaseUser | null = this._auth.currentUser;
        if (!user) {
           observer.error(new Error(AuthErrorMessages.INVALID_USER_TOKEN));
        }
        user.getIdToken()
          .then( (token: string) => {
            observer.next(token);
            observer.complete();
          })
          .catch((error: any) =>{
            observer.error(error);
          });
    });
  }

  hasTokenProvider() :boolean{
    return !!sessionStorage.getItem('accessToken');
  }
  removeTokenProvider(id: string) :void{
    sessionStorage.removeItem(id);
  }
  setTokenProvider(id:string, token: string) :void{
    sessionStorage.setItem(id, token);
  }
  getTokenProvider() :string{
    return sessionStorage.getItem('accessToken') as string;
  }


}
