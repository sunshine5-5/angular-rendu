import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <!-- navbar -->
    <nav class="navbar">
      <a routerLink="/users" class="brand">
        <img src="icon.png" alt="DummyHub logo" class="logo" />
        <span class="name">DummyHub</span>
      </a>
 
      <div class="links">
        <a
          routerLink="/users"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Users
        </a>

        <a routerLink="/posts" routerLinkActive="active">
          Posts
        </a>

        <a routerLink="/products" routerLinkActive="active">
          Products
        </a>
      </div>
    </nav>

    <!--content-->
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :root {
      --bg: #F6F0D7;
      --card: #ffffff;
      --primary: #89986D;
      --accent: #C5D89D;
      --text: #2F3E2E;
      --muted: #6B705C;
    }

    
    * {
      box-sizing: border-box;
    }

    /* navbar*/
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 32px;
      background: var(--card);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    /*brand */
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text);
      font-weight: 800;
      font-size: 20px;
    }

    .logo {
      width: 38px;
      height: 38px;
      object-fit: contain;
      border-radius: 10px;
    }

    .name {
      letter-spacing: 0.5px;
    }

    /* liens*/
    .links {
      display: flex;
      gap: 28px;
    }

    .links a {
      position: relative;
      text-decoration: none;
      font-weight: 600;
      color: var(--muted);
      padding: 6px 0;
      transition: color 0.3s ease;
    }

    .links a:hover {
      color: var(--primary);
    }

    .links a.active {
      color: var(--primary);
    }

    
    .links a::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 0;
      height: 3px;
      background: var(--primary);
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .links a:hover::after,
    .links a.active::after {
      width: 100%;
    }

    .content {
      max-width: 1100px;
      margin: 40px auto;
      padding: 0 20px;
    }
  `]
})
export class AppComponent {}
