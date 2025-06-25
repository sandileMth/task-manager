// src/app/task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; // For reactive data updates

// Define a simple interface for our Task objects
export interface Task {
  id: number;
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string; // Storing as string for simplicity with date input
  completed: boolean;
}

@Injectable({
  providedIn: 'root' // This makes the service a singleton available throughout the app
})
export class TaskService {
  private tasks: Task[] = []; // Array to hold our tasks
  // BehaviorSubject holds the current value and emits it to new subscribers
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  // Expose tasks as an Observable, so components can subscribe to changes
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  private nextId: number = 1; // Simple ID counter

  constructor() {
    // Optional: Load initial tasks (e.g., from local storage or a mock API)
    this.loadTasks();
  }

  private loadTasks(): void {
    const storedTasks = localStorage.getItem('angular-tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      // Find the highest ID to ensure `nextId` is unique
      const maxId = this.tasks.reduce((max, task) => Math.max(max, task.id), 0);
      this.nextId = maxId + 1;
      this.tasksSubject.next(this.tasks); // Emit loaded tasks
    }
  }

  private saveTasks(): void {
    localStorage.setItem('angular-tasks', JSON.stringify(this.tasks));
  }

  addTask(task: Omit<Task, 'id' | 'completed'>): void {
    const newTask: Task = {
      id: this.nextId++,
      ...task,
      completed: false // New tasks are not completed by default
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks); // Emit the updated tasks array
    this.saveTasks(); // Persist tasks
  }

  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next(this.tasks); // Emit the updated tasks array
      this.saveTasks(); // Persist tasks
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next(this.tasks); // Emit the updated tasks array
    this.saveTasks(); // Persist tasks
  }
}