import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  return authService.isLoggedIn().then(isLoggedIn => {
    if (isLoggedIn) {
      return true;
    } else {
      snackBar.open('Nie jesteś zalogowany!', 'OK');
      return router.createUrlTree(['/login']);
    }
  });
};
