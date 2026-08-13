import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  // variables that use RxJS have this naming convention
  messages$ = new BehaviorSubject<string[]>([]);
  private messages: string[] = [];
  get allMessages() {
    return [...this.messages];
  }

  addMessage(message: string) {
    this.messages = [...this.messages, message];
    // this, combined with BehaviorSubject will now trigger an event which causes change detection to start
    // see messages-list for more
    this.messages$.next([...this.messages]);
  }
}
