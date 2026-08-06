import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  Output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements AfterViewInit {
  // we can access the form template var without passing it as a parameter to the onSubmit function
  // ViewChild allows us to search for template variable names or the ButtonComponent for example

  // @ViewChild('form') private form?: ElementRef<HTMLFormElement>;

  // this is the more modern approach, it uses signals
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  add = output<{ title: string; text: string }>();

  // you are guaranteed that you have access to anything that was grabbed by ViewChild
  ngAfterViewInit(): void {
    console.log(this.form().nativeElement);
  }

  // this can store an array of ElementRefs for different buttons for example
  // @ViewChildren(ButtonComponent) buttons;

  onSubmit(title: string, ticketText: string) {
    this.add.emit({ title: title, text: ticketText });
    this.form().nativeElement.reset();
  }
}
