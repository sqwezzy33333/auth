import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserInfo, LoginResponse } from '../models';
import { Router } from '@angular/router';

import Cookies from 'js-cookie';
import { Observable, of } from 'rxjs';
import { Tokens } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static loginPath = 'http://51.158.107.27:82/api/login';
  static TOKEN = 'token';
  static REFRESH_TOKEN = 'refreshToken';

  constructor(private http: HttpClient, private router: Router) {}

  tryLogin$(userData: User) {
    return this.http.post<Observable<LoginResponse>>(
      AuthService.loginPath,
      userData
    );
  }

  successLogin(data: Tokens, userData: LoginResponse, toSave: boolean) {
    this.setToken(data.token, data.refreshToken);
    localStorage.setItem('user', JSON.stringify(userData.userInfo));
    if (toSave) {
      localStorage.setItem('token', JSON.stringify(data.token));
    }
    this.router.navigate(['/dashboard']);
  }

  setToken(token: string, refreshToken: string) {
    Cookies.set(AuthService.TOKEN, token);
    Cookies.set(AuthService.REFRESH_TOKEN, refreshToken);
  }

  isUser() {
    return of(
      !!((
        Cookies.get(AuthService.TOKEN) && Cookies.get(AuthService.REFRESH_TOKEN)
      ) || localStorage.getItem('token'))
    );
  }

  logOut() {
    Cookies.remove(AuthService.TOKEN);
    Cookies.remove(AuthService.REFRESH_TOKEN);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getUser(): UserInfo | null {
    let User = localStorage.getItem('user');

    if (User) return JSON.parse(User);
    return null;
  }
}
