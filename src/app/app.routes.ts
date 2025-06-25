// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Import your standalone components
import { TaskFormComponent } from './task-form/task-form';
import { TaskListComponent } from './task-list/task-list';

export const routes: Routes = [
  // Route for adding a new task
  { path: 'add-task', component: TaskFormComponent },

  // Route for viewing tasks
  { path: 'view-tasks', component: TaskListComponent },

  // Default route: Redirect empty path ('/') to '/add-task'
  { path: '', redirectTo: '/add-task', pathMatch: 'full' },

  // Wildcard route: For any path not matched above, redirect to add-task
  { path: '**', redirectTo: '/add-task' }
];