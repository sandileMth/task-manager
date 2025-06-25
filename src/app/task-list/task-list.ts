// src/app/task-list/task-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor, ngClass
import { TaskService, Task } from '../task'; // Import TaskService and Task interface
import { Observable, Subscription } from 'rxjs'; // For Observables and cleanup

@Component({
  selector: 'app-task-list',
  standalone: true, // This is a standalone component
  imports: [CommonModule], // CommonModule provides *ngFor, ngClass etc.
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks$: Observable<Task[]>; // Observable stream of tasks

  // Using a Subscription to properly clean up when the component is destroyed
  private tasksSubscription: Subscription | undefined;

  constructor(private taskService: TaskService) {
    // Assign the tasks Observable from the service to our component property
    this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit(): void {
    // Subscribe to the tasks$ Observable.
    // This is where we react to changes in the task list from the service.
    // We're not doing much with the immediate value here because we'll use async pipe
    // but it's good practice to understand subscription lifecycles.
    this.tasksSubscription = this.tasks$.subscribe(tasks => {
      // console.log('Tasks updated:', tasks); // For debugging: see tasks in console
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  /**
   * Toggles the 'completed' status of a task.
   * @param taskId The ID of the task to toggle.
   */
  toggleCompletion(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
  }

  /**
   * Deletes a task.
   * @param taskId The ID of the task to delete.
   */
  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  /**
   * Helper function to determine task priority class for styling.
   * @param priority The priority string.
   * @returns A CSS class name.
   */
  getPriorityClass(priority: 'High' | 'Medium' | 'Low'): string {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  }
}