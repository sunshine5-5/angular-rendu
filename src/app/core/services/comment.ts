import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api/api.config';
import { Comment } from '../../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {}

  // GET /comments?postId=X
  getCommentsByPost(postId: number): Observable<{ comments: Comment[] }> {
    return this.http.get<{ comments: Comment[] }>(
      `${API_URL}/comments?postId=${postId}`
    );
  }
}
