import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';

type PostsResponse = { posts: Post[]; total: number; skip: number; limit: number };

@Injectable({ providedIn: 'root' })
export class PostService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(`${this.baseUrl}/posts`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  getPostsByUser(userId: number): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(`${this.baseUrl}/posts/user/${userId}`);
    // Alternative acceptée aussi: /posts?userId=X mais DummyJSON fournit /posts/user/X
  }
}
