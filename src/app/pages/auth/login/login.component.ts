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
    private authService: AuthService,
    private coreService: CoreService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.subscription = this.coreService.getData().subscribe((res: Data[]) => {
      this.data = res;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showInputType(inputTyp: InputType) {
    this.snackBar.open(inputTyp, "OK");
  }

  logIn() {
    const credentials = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    } as User;
    this.authService.login(credentials)
      .subscribe(
        (isAuthorize: boolean) => {
          if (isAuthorize) {
            this.router.navigate(['/book/list']);
          } else {
            this.snackBar.open("Błąd logowania.", "OK");
          }
        }
      );
  }
}
