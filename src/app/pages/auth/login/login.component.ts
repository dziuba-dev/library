import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Data} from "../../../core/models/data";
import {InputType} from "../../../core/models/input-type";
import {AuthService} from "../../../core/services/auth.service";
import {User} from "../../../core/models/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CoreService} from "../../../core/services/core.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subscription!: Subscription;
  data: Data[] = [];

  constructor(
    public fb: FormBuilder,
    private _authService: AuthService,
    private _coreService: CoreService,
    private _snackBar: MatSnackBar,
    private _router: Router) {
    this.loginForm = fb.group({
      emial: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.subscription = this._coreService.getData().subscribe((res: Data[]) => {
      this.data = res;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showInputType(inputTyp: InputType) {
    this._snackBar.open(inputTyp, "OK");
  }

  logIn() {
    const credentials = {
      emial: this.loginForm.controls['login'].value,
      password: this.loginForm.controls['password'].value
    } as User;
    this._authService.login(credentials)
      .subscribe(
        (isAuthorize: boolean) => {
          if (isAuthorize) {
            this._router.navigate(['/book/list']);
          } else {
            this._snackBar.open("Błąd logowania.", "OK");
          }
        }
      );
  }
}
