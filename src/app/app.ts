import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],

  template: `
    <nav>
      <a routerLink="/users" routerLinkActive="active">Users</a>
      <a routerLink="/posts" routerLinkActive="active">Posts</a>
      <a routerLink="/products" routerLinkActive="active">Products</a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    nav {
      background: #ffffff;
      padding: 12px;
      display: flex;
      gap: 16px;
      border-bottom: 1px solid #ddd;
    }

    nav a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
    }

    nav a.active {
      color: #007bff;
      border-bottom: 2px solid #007bff;
    }

    main {
      padding: 20px;
    }
  `]
})
export class AppComponent {}
