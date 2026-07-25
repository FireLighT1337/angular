import { Component, EventEmitter, input, Input, Output, output } from '@angular/core';
import { UserType } from './user.model';
import { Card } from '../shared/card/card';
// import { DUMMY_USERS } from '../dummy-users';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  imports: [Card],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  /* Comment code is an example of how signals could be implemented

  selectedUser = signal(DUMMY_USERS[randomIndex]);
  imagePath = computed(() => 'assets/users/' + this.selectedUser().avatar);

  Example of Signal Input, can be implemented multiple ways
  They are also read only in this file and can only be modified outside
  
  avatar = input('');
  avatar = input<string>();
  avatar = input.required<string>(); cannot pass an initial value */

  // simple way of doing this
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;

  @Input({ required: true }) user!: UserType;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  // Alternative output function, does not use Signals like the input function
  // select = output<string>();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() {
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    // this.selectedUser.set(DUMMY_USERS[randomIndex]);
    this.select.emit(this.user.id);
  }
}
