import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from './shared/services/fire-auth.service';
import { AuthErrorMessages } from './shared/model/errorsMessages';
import { AuthResponseModel } from './shared/response/authResponse.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HylyfWebApp';
  constructor(
    private _router: Router,
    private _fireAuth : FireAuthService,
    private _authResponseModel: AuthResponseModel
  ) {}
  async ngOnInit(): Promise<void> {
    try {
      //redireccion a cuentagoogle
      const result = await this._fireAuth.checkRedirectResult();

      if (result?.success && result.data?.id) {
        await this._router.navigate([`/profile/${result.data.id}`], {
          state: { user: result.data }
        });
      }
    } catch (error) {
      console.error('Error en la redirección de Google:', error);
      const errorCode: string = error?.code || AuthErrorMessages.ERROR_REDIRECT;
      this._authResponseModel.signInProviderFailed(errorCode);
    }
  }
}
