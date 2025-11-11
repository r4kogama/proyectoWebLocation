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
    // Con signInWithPopup ya no usamos el handler de redirect.
    // Si necesitas manejar un resultado del popup, hacerlo mediante observables de Auth en otro servicio.
  }
}
