import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './shared/card/shared.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  // we have 2 options here, we can make all components non-standalone and add them to the declarations array
  // or we can "import" standalone components in the imports array (useful if we are migrating from non-standalone components for example)
  declarations: [AppComponent, HeaderComponent, UserComponent],
  bootstrap: [AppComponent],
  // when using Modules we need to import the BrowserModule
  imports: [BrowserModule, SharedModule, TasksModule],
})
export class AppModule {}
