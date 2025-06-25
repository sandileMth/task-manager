// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // Import provideRouter

import { routes } from './app.routes'; // Import your routes array

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes) // Provide the router with your defined routes
  ]
};
