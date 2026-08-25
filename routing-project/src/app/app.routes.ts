import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from './tasks/new-task/new-task.component';
import { inject } from '@angular/core';

// const dummyCanMatch: CanMatchFn = (route, segments) => {
//   const router = inject(Router);
//   const shouldGetAccess = Math.random();
//   if (shouldGetAccess < 0.5) {
//     return true;
//   }
//   return new RedirectCommand(router.parseUrl('/unauthorized'));
// };

// we import this into the provideRouter function in the main.ts
export const routes: Routes = [
  { path: '', component: NoTaskComponent, title: 'No task selected' },
  // this is a nested route, so it would look like this: users/:userId/tasks
  // we also need to add a router outlet in the component that is using the child component
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: [
      // this would be a way to redirect
      { path: '', redirectTo: 'tasks', pathMatch: 'prefix' },
      { path: 'tasks', component: TasksComponent },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        // this will ask the user for example if they really want to leave the page
        canDeactivate: [canLeaveEditPage],
      },
    ],
    // this is how you can set route guards
    // canMatch: [dummyCanMatch],
    // you can set any key value pairs in this data object, this would be static though
    data: {
      message: 'Hello!',
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      userName: resolveUserName,
    },
    // we can dynamically change the page title
    title: resolveTitle,
  },
  // this is a fallback if non of the routes match
  {
    path: '**',
    component: NoTaskComponent,
  },
];
