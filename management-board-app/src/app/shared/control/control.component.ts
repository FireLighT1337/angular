import {
  AfterContentInit,
  afterNextRender,
  afterRender,
  Component,
  contentChild,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  // here we make the css of this component globally available
  encapsulation: ViewEncapsulation.None,
  // host will add any key value pair as properties to the element
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent implements AfterContentInit {
  // alternatively this does the same as the host property above
  // @HostBinding('class') className = 'control';

  // this listens for an event but can also be done in the host property above
  // @HostListener('click') onClick() {
  //   console.log('Clicked');
  // }
  label = input.required<string>();
  // this is how to access the host element in code
  private el = inject(ElementRef);

  // since we use ng-content in this html template, we cannot use @ViewChild
  // we have to use @ContentChild since we project content
  // the template variable needs to be set in the original html code and not in ng-content

  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;

  // this is the modern signal way of using @ContentChild
  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    // these functions register changes anywhere on the website
    // however afterNextRender waits for a full re-render and afterRender does not
    // in Angular 20+ this is called afterEveryRender
    afterRender(() => {
      console.log('afterRender');
    });

    afterNextRender(() => {
      console.log('afterNextRender');
    });
  }

  // this guarantees that you have access to anything that ContentChild has grabbed
  ngAfterContentInit(): void {
    console.log(this.control());
  }

  onClick() {
    console.log('Clicked');
    console.log(this.el);
    console.log(this.control());
  }
}
