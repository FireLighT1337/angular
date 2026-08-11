import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
})
// you can also inject a service through the element injector,
// which can be added as an argument in the @Component
// providers: [TasksService],

// only child components (or this parent) inherit the service for this injector, so any components that are used in the html template
// also important: if there are multiple components of the same type, the service instance is different for each
export class TasksComponent {}
