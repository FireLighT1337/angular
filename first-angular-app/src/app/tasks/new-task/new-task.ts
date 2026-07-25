import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  // FormsModule helps us to deal with Forms by providing directives like ngModel
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter<void>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';
  // if we want to use the service that we created in another file, we can do it like this with the inject method
  private tasksService = inject(TasksService);

  // Alternatively when working with 2-way binding and signals, you just need to do this, the ngModel part stays the same
  //
  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDate = signal('');

  onCancelAddTask() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId,
    );
    this.close.emit();
  }
}
