import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../../core/services/user';
import { User } from '../../../models/user';

type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UsersListComponent {
  users$!: Observable<UsersResponse>;

  constructor(private userService: UserService) {
    
    this.users$ = this.userService.getUsers();
  }
}
