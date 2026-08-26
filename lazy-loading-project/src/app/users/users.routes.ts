import { ResolveFn, Routes } from '@angular/router';

import {
  NewTaskComponent,
  canLeaveEditPage,
} from '../tasks/new-task/new-task.component';
import { inject } from '@angular/core';
import { Task } from '../tasks/task/task.model';
import { TasksService } from '../tasks/tasks.service';

// we moved this function from the tasks.component to enable lazy loading, cause the application would not lazy load if it was in there
const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState,
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId'),
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};

export const routes: Routes = [
  // since this whole file is lazy loaded, we can wrap all the routes inside of a new route and add the TasksService to the providers
  // that way we can also lazy load a service, that only works cause this file is lazy loaded though
  {
    path: '',
    providers: [TasksService],
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        // this is also part of lazy loading, if something is imported like this it is only imported once needed
        loadComponent: () =>
          import('../tasks/tasks.component').then((mod) => mod.TasksComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
