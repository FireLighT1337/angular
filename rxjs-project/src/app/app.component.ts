import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  // signals and observables are very similar
  // the main difference is in the use:
  // observable = great for managing events or streamed data
  // signal = great for managing application state
  // observables also dont have an initial value, compared to a signal
  clickCount = signal(0);

  // this is how we can convert a signal into an observable, always use it where you would inject a value
  clickCount$ = toObservable(this.clickCount);

  // we will convert this into a signal
  interval$ = interval(1000);
  // we can pass an initial value here if we want
  // when using toSignal, the cleanup is automated so you dont need to use destroyRef
  // if you want to manually cleanup, you can pass manualCleanup as a parameter
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  // we build our own observable now, something like interval() also uses this under the hood
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value');
      subscriber.next({ message: 'New value' });
    }, 2000);
  });
  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times`);
    // });
  }

  ngOnInit(): void {
    const subscription = interval(1000)
      // you can add operators into these pipes to modify any values that your observable emits
      .pipe(map((val) => val * 2))
      // subscribe will cause rxjs to emit a value
      .subscribe({
        next: (val) => console.log(val),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    // here we use the converted signal as an observable
    const subscription2 = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times`),
    });

    this.destroyRef.onDestroy(() => {
      subscription2.unsubscribe();
    });

    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Completed'),
    });
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
