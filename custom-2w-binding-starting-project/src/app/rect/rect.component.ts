import { Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding

  // old way of doing it:
  // @Input({ required: true }) size!: { width: string; height: string };
  // // for Angular to understand that you want to do custom 2-way binding the variable has to be named like ...Change
  // @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();

  // new way of custom 2-way binding:
  size = model.required<{ width: string; height: string }>();

  onReset() {
    // this.sizeChange.emit({
    //   width: '150',
    //   height: '100',
    // });
    this.size.set({
      width: '150',
      height: '100',
    });
  }
}
