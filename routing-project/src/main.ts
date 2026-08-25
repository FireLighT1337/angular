import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app/app.routes';

// if we want to use routing, we need to use provideRouter
// for cleaner code its best practice to keep the routes in an app.route.ts file
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
    ),
  ],
}).catch((err) => console.error(err));
