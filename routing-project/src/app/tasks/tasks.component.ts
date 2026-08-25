import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  // if we want access to parent route data we need to add this in the main.ts file: withRouterConfig({ paramsInheritanceStrategy: 'always'})
  // now we can grab the userId
  userId = input.required<string>();
  // here we extract the queryParam
  // if we dont have access to signals we can use the same approach as in the user-tasks.component.ts
  order = input<'asc' | 'desc'>();
  private tasksService = inject(TasksService);
  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'desc') {
          return a.id > b.id ? -1 : 1;
        } else {
          return a.id > b.id ? 1 : -1;
        }
      }),
  );
}
