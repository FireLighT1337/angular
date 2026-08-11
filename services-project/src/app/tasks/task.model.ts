import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

type TaskStatusOptions = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  text: string;
}[];

// this token is optional but we use it here for practice, we could just use the root injector
export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>(
  'task-status-options',
);

// this is here to show that not only services can be injected
export const TaskStatusOptions: TaskStatusOptions = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open',
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In-progress',
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed',
  },
];

// this is here to make the element injector a bit leaner
export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions,
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
