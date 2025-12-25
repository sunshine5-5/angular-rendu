import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment';

type CommentsResponse = { comments: Comment[]; total: number; skip: number; limit: number };

@Injectable({ providedIn: 'root' })
export class CommentService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getCommentsByPost(postId: number): Observable<CommentsResponse> {
    return this.http.get<CommentsResponse>(`${this.baseUrl}/comments/post/${postId}`);
  }
}
