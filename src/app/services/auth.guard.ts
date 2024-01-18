import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isUser().pipe(
    map((bool) => {
      if (bool) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

export const loginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isUser().pipe(
    map((e) => {
      if (e) {
        router.navigate(['/dashboard']);
      }

      return !e;
    })
  );
};

export const redirectGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.isUser().subscribe((isUser) => {
    if (isUser) {
      router.navigate(['/dashboard']);
    } else {
      router.navigate(['/login']);
    }
  });
  return of(false);
};
