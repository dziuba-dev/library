import { Component } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
