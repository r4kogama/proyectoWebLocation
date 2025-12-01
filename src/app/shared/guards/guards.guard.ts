import { Injectable } from '@angular/core';
import {  CanLoad, Router, UrlTree, UrlSegment, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FireAuthService } from '../services/fire-auth.service';
import { Observable } from 'rxjs';
import { AuthErrorMessages } from '../model/errorsMessages';
import { AuthResponseModel } from '../response/authResponse.model';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GuardsGuard implements CanLoad, CanActivate {
  constructor(
    private _fireAauthService: FireAuthService,
    private _authResponseModel : AuthResponseModel,
    private _router: Router
  ) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    try {
      if (this._fireAauthService.getTokenFirebase()) {
        return true;
      } else {
        return this._router.createUrlTree(['/login']);
      }
    }
     catch (error) {
      console.error('Error in GuardsGuard:', error);
      const codeError: string = error?.code || AuthErrorMessages.NULL_USER;
      this._authResponseModel.handleNullUser(codeError);
      return this._router.createUrlTree(['/login']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._fireAauthService.getCurrentUser().pipe(
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
