// src/app/app.component.ts
import { Component } from '@angular/core';
// Import standalone router features needed for the template
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // This component is now standalone
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // Import features directly here
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'My Task Manager'; // Our app's title
}