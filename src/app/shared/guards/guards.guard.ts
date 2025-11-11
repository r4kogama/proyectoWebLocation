import { Injectable } from '@angular/core';
import {  CanLoad, Router, UrlTree, UrlSegment, Route } from '@angular/router';
import { FireAuthService } from '../services/fire-auth.service';
import { Observable } from 'rxjs';
import { AuthErrorMessages } from '../model/errorsMessages';
import { AuthResponseModel } from '../response/authResponse.model';

@Injectable({
  providedIn: 'root'
})

export class GuardsGuard implements CanLoad {
  constructor(
    private _FireAauthService: FireAuthService,
    private _authResponseModel : AuthResponseModel,
    private _router: Router
  ) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    try {
      if (this._FireAauthService.getToken()) {
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


}
