import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

type UsersResponse = { users: User[]; total: number; skip: number; limit: number };

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.baseUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }
}
