import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from './shared/services/fire-auth.service';
import { AuthResponseModel } from './shared/response/authResponse.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'FindlyWebApp';
  constructor(
    private readonly _router: Router,
    private readonly _fireAuth: FireAuthService,
    private readonly _authResponseModel: AuthResponseModel,
  ) {}




}
