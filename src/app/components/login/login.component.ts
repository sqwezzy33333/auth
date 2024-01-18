import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, of, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models';
import { ToastService } from 'src/app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  inputValidation = [Validators.required, Validators.minLength(8)];
  isError = false;
  subscriber!: Subscription;
  @ViewChild('savePass') savePass!: ElementRef;

  loginForm: FormGroup = new FormGroup({
    login: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private auth: AuthService, private toast: ToastService) {}

  submit() {
    if (this.login.errors || this.pass.errors) {
      this.isError = true;
    } else {
      this.isError = false;
      this.subscriber = this.auth
        .tryLogin$(this.user)
        .pipe(
          catchError((e) => {
            this.addError(e);
            return of(null);
          })
        )
        .subscribe((res: any) => {
          if (res !== null) {
            if (res.userInfo.userRole == 1) {
              this.auth.successLogin(res.tokens, res, this.savePassChecked);
            } else {
              this.isError = true;
              this.toast.add('У вас нет прав', 'error');
            }
          }
        });
    }
  }

  addError(e: HttpErrorResponse) {
    try {
      this.toast.add(e.error.errors[0], 'error');
      return
    } catch (error) {}
    try {
      this.toast.add(e.error.Message, 'error');
    } catch (error) {}
    this.isError = true;
  }

  get savePassChecked() {
    return this.savePass.nativeElement.checked;
  }

  get user(): User {
    return {
      login: this.login.value,
      password: this.pass.value,
    };
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  get login(): AbstractControl {
    return this.loginForm.get('login')!;
  }
  get pass(): AbstractControl {
    return this.loginForm.get('password')!;
  }
}
