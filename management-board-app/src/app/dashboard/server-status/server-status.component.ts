import {
  Component,
  DestroyRef,
  effect,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
// we can implement certain interfaces to make sure we dont have any typos for ngOnInit for example
export class ServerStatusComponent implements OnInit, OnDestroy {
  // this is a literal type, it will only allow these 3 values for the string
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  // we could also do this with signals
  // currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');

  // currentStatus would log only once at the start cause there is no subscription in the case below
  // if we use the effect function we fix that problem
  // constructor() {
  //   effect(() => {
  //     console.log(this.currentStatus());
  //   });
  // }

  // When working with Signal effects, you sometimes might need to perform some cleanup work before the effect function runs again
  // (e.g., to clear some timer or something like that).
  // Angular's effect() allows you to do that!
  // It does provide you with an onCleanup hook which you can execute as part of your effect function to define what should happen before the effect code runs the next time:

  // effect((onCleanup) => {
  //   const tasks = getTasks();
  //   const timer = setTimeout(() => {
  //     console.log(`Current number of tasks: ${tasks().length}`);
  //   }, 1000);
  //   onCleanup(() => {
  //     clearTimeout(timer);
  //   });
  // });

  private interval?: ReturnType<typeof setInterval>;

  // this is a modern alternative to ngOnDestroy
  // private destroyRef = inject(DestroyRef);

  // this is technically fine but ngOnInit is best practice
  // constructor() {
  //   setInterval(() => {
  //     const rnd = Math.random();
  //     if (rnd < 0.5) {
  //       this.currentStatus = 'online';
  //     } else if (rnd < 0.9) {
  //       this.currentStatus = 'offline';
  //     } else {
  //       this.currentStatus = 'unknown';
  //     }
  //   }, 5000);
  // }

  ngOnInit() {
    // const interval = setInterval ...
    // this.destroyRef.onDestroy(() => {
    //   clearInterval(this.interval)
    // })
    this.interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);
  }

  // used for cleanup to avoid memory leaks for example
  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }
}
