import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { RouterOutlet } from '@angular/router';

// we import RouterOutlet here and use it to render our route in the app.component.ts
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, UsersComponent, RouterOutlet],
})
export class AppComponent {}
