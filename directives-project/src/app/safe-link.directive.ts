import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

// for directives an attribute selector makes the most sense, so we can enhance other components
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective],
})
// hostDirectives allows you to use certain directives by default, without specifically adding them to an element for example
export class SafeLinkDirective {
  // it is a common pattern to add an alias here that is named after the selector
  queryParam = input('myapp', { alias: 'appSafeLink' });
  // directives can also use the host element:
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('Directive is active');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');

    if (wantsToLeave) {
      // with this we convice TS that this is an HTMLAnchorElement
      //   const address = (event.target as HTMLAnchorElement).href;
      //   (event.target as HTMLAnchorElement).href =
      //     address + '?from=' + this.queryParam();

      // a cleaner way to do this, we utilise the host element above
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }
}
