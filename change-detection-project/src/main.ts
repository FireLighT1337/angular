import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

// Zoneless removes the zone.js polyfills from the angular.json
// it relies on signals only and we need to import provideExperimentalZonelessChangeDetection and add it to the config (providers array) below
bootstrapApplication(AppComponent).catch((err) => console.error(err));
