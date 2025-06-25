// src/app/task-form/task-form.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { CommonModule } from '@angular/common'; // Provides common directives like ngIf, ngFor etc.

import { TaskService, Task } from '../task'; // Import our TaskService and Task interface

@Component({
  selector: 'app-task-form',
  standalone: true, // This is a standalone component
  imports: [FormsModule, CommonModule], // Import necessary modules for template features
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent {
  // Properties to hold the form input values
  newTaskName: string = '';
  newTaskPriority: 'High' | 'Medium' | 'Low' = 'Medium'; // Default priority
  newTaskDueDate: string = '';

  // Inject TaskService into the component's constructor
  constructor(private task: TaskService) {}

  /**
   * Handles the submission of the new task form.
   * Creates a new task object and adds it via the TaskService.
   */
  addTask(): void {
    if (this.newTaskName.trim()) { // Basic validation: Ensure task name is not empty
      const newTask: Omit<Task, 'id' | 'completed'> = {
        name: this.newTaskName.trim(),
        priority: this.newTaskPriority,
        dueDate: this.newTaskDueDate // Date input will give 'YYYY-MM-DD' string
      };
      this.task.addTask(newTask); // Add task using the service

      // Reset form fields after adding
      this.newTaskName = '';
      this.newTaskPriority = 'Medium';
      this.newTaskDueDate = '';
    } else {
      alert('Task name cannot be empty!'); // Using alert for simplicity, a custom modal is better for production
    }
  }
}