import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// when going "Zoneless" check the main.ts
export class MessagesListComponent implements OnInit {
  private messagesService = inject(MessagesService);
  // a very simple alternative is the async pipe, we just need this and the rest is in the html
  messages$ = this.messagesService.messages$;

  // we need to inject this for change detection to trigger
  private cdRef = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  messages: string[] = [];

  // this is the setup for triggering, we utilise RxJS in the service and pass the messages
  ngOnInit(): void {
    const subscription = this.messagesService.messages$.subscribe(
      (messages) => {
        this.messages = messages;
        // this line will trigger the change detection and is not part of RxJS, without this line it still would not work
        this.cdRef.markForCheck();
      },
    );
    // this is just a small cleanup for best practice
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
