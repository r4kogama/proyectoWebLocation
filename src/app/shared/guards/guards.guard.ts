import { Injectable } from '@angular/core';
import {  CanLoad, Router } from '@angular/router';
import { FireAuthService } from '../services/fire-auth.service';

@Injectable({
  providedIn: 'root'
})

export class GuardsGuard implements CanLoad {
  constructor(private _FirAauthService: FireAuthService,
    private router: Router) { }
  canLoad() {
    if (this._FirAauthService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
