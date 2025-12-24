import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api/api.config';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  // GET /users
  getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${API_URL}/users`);
  }

  // GET /users/{id}
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }
}
