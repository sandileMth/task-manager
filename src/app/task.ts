// src/app/task.ts (Your service file)
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService { // <--- Make sure this is 'TaskService' and is exported
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();
  private nextId: number = 1;

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const storedTasks = localStorage.getItem('angular-tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      const maxId = this.tasks.reduce((max, task) => Math.max(max, task.id), 0);
      this.nextId = maxId + 1;
      this.tasksSubject.next(this.tasks);
    }
  }

  private saveTasks(): void {
    localStorage.setItem('angular-tasks', JSON.stringify(this.tasks));
  }

  addTask(task: Omit<Task, 'id' | 'completed'>): void {
    const newTask: Task = {
      id: this.nextId++,
      ...task,
      completed: false
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next(this.tasks);
      this.saveTasks();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }
}