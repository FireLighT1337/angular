import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  // both of these methods are for extracting dynamic route paramters, the variable has to be named like the route e.g. tasks/:userId
  // we need to add withComponentInputBinding to the main.ts for this to work

  // we use the resolveUserName function at the bottom to get the data dynamically from the route
  userName = input.required<string>();
  // we can fetch the static data like this
  message = input.required<string>();
  // alternatively you can get access to both values like this:
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  // this is the signal approach

  // userId = input.required<string>();
  // private usersService = inject(UsersService);

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name,
  // );

  // this would be an alternative if signals are not available

  // userName = '';
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // ngOnInit(): void {
  //  there also is activatedRoute.snapshot, which basically is useful when you only need one time access to the data
  //   console.log(this.activatedRoute);
  //   const sub = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || '';
  //     },
  //   });
  //   this.destroyRef.onDestroy(() => sub.unsubscribe());
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId'),
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
