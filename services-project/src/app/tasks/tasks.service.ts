import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// for an alternative way how to inject, look in main.ts
// this inject here is a bit more optimised
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // this makes the tasks available to everything, but they can only be changed here
  private tasks = signal<Task[]>([]);

  // this is how to inject a service into another one: (same way)
  private loggingService = inject(LoggingService);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log(taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
    this.loggingService.log(newStatus);
  }
}
