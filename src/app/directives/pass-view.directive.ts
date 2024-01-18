import { Directive, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

@Directive({
  selector: '[passView]',
})
export class PassViewDirective {
  @Input() input!: HTMLInputElement;
  @Input() toggleClass!: string;
  toShow = false;
  constructor(private el: ElementRef) {}

  @HostListener('click') click() {
    this.el.nativeElement.classList.toggle(this.toggleClass);

    this.toShow = !this.toShow;
    this.input.type = this.toShow ? 'text' : 'password';
  }
}
