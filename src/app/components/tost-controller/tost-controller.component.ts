import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { Toast } from 'src/app/models';
import { style, transition, trigger, animate } from '@angular/animations';

@Component({
  selector: 'app-tost-controller',
  templateUrl: './tost-controller.component.html',
  styleUrls: ['./tost-controller.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class TostControllerComponent implements OnInit {
  toasts: Toast[] = [];
  duration = 5;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastStorage$.subscribe((e) => {
      if (this.toasts.length > 2) {
        this.toasts.shift();
      }
      this.toasts.push(e);
      timer(this.duration * 1000).subscribe(() => {
        if (this.toasts.includes(e)) {
          this.remove(e);
        }
      });
    });
  }

  remove(item: Toast) {
    let index = this.toasts.indexOf(item);

    this.toasts.splice(index, 1);
  }

  setPosition(e: HTMLElement, item: Toast) {
    let index = this.toasts.indexOf(item);
    e.style.top = index * e.offsetHeight + index * 10 + 20 + 190 + 'px';
    e.classList.add('to-position');
  }
}
