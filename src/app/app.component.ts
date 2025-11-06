import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from './shared/services/fire-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HylyfWebApp';
  constructor(
    private _router: Router,
    private _fireAuth : FireAuthService
  ) {}
  async ngOnInit(): Promise<void> {
    //redireccion a cuentagoogle
     const result = await this._fireAuth.checkRedirectResult();

    if (result?.success && result.data?.id) {
      this._router.navigate([`/profile/${result.data.id}`]);
      state: { user: result.data }
    }
  }
}
