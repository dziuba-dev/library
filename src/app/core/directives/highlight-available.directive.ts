import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[libHighlightAvailable]'
})
export class HighlightAvailableDirective implements OnInit {
  @Input() libHighlightAvailable!: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.color = this.libHighlightAvailable ? 'green' : 'red';
  }
}
