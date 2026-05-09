import { Injectable } from '@angular/core';
import {  CanLoad, Router, UrlTree, UrlSegment, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FireAuthService } from '../services/fire-auth.service';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthErrorMessages } from '../model/errorsMessages';
import { AuthResponseModel } from '../response/authResponse.model';
import { take, map } from 'rxjs/operators';
import { getFirebaseErrorMessage } from '../model/fbAuthErrorMap';
import { StateMessageService } from '../services/state-message.service';

@Injectable({
  providedIn: 'root'
})

export class GuardsGuard implements CanLoad, CanActivate {
  constructor(
    private readonly _fireAauthService: FireAuthService,
    private readonly _router: Router,
    private readonly _stateMessageNavigation : StateMessageService,
  ) { }

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree> {
    try {
      const observerToken$: Observable<string> = this._fireAauthService.getTokenFirebase$();
      const currentUserAuth = await firstValueFrom(observerToken$);
      if (currentUserAuth) {
        return true;
      } else {
        return this._router.createUrlTree(['/login']);
      }
    }
     catch (error) {
      const result = await getFirebaseErrorMessage(error);
      if(!this._stateMessageNavigation.isSetMessage(result,'error')){
        console.log('Mensaje de navegacion no salvado.');
      };
      return this._router.createUrlTree(['/login']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._fireAauthService.getCurrentUser$().pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          this._router.navigate(['/login'], {
            queryParams: { session: 'expired' }
          });
          return false;
        }
      })
    );
  }

}
