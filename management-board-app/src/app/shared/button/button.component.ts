import { Component } from '@angular/core';

@Component({
  // another way of using selectors, button.button would also work, it will look for a button that has the css class of button
  // we can also have multiple selectors here seperated by comma
  // the HOST ELEMENT of a component is always the selector, we can replace the word button in css with the tag :host for example
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {}
