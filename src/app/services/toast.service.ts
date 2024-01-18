import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastStorage$ = new Subject<Toast>();
  constructor() {}

  add(text: string, type: string) {
    this.toastStorage$.next({
      text: text,
      type: type,
    });
  }
}
