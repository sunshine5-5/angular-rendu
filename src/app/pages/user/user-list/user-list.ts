import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
 imports: [CommonModule, RouterModule],

  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        this.loading = false;
      },
      error: () => {
        this.error = "Erreur lors du chargement des utilisateurs.";
        this.loading = false;
      }
    });
  }
}
