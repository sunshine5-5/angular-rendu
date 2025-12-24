import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api/api.config';
import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  // GET /posts
  getPosts(): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(`${API_URL}/posts`);
  }

  // GET /posts/{id}
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${API_URL}/posts/${id}`);
  }

  // GET /posts?userId=X
  getPostsByUser(userId: number): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(
      `${API_URL}/posts?userId=${userId}`
    );
  }
}
