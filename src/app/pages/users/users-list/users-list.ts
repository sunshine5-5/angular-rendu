import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserService } from '../../../core/services/user';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css'
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      this.users = res.users;
    });
  }
}
