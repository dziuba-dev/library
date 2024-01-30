import { Component } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private _authService: AuthService) {
  }

  logout() {
    this._authService.logout();
  }
}
