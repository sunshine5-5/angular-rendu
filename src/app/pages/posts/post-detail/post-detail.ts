import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, switchMap, map } from 'rxjs';

import { PostService } from '../../../core/services/post';
import { CommentService } from '../../../core/services/comment';
import { Post } from '../../../models/post';
import { Comment } from '../../../models/comment';

type PostDetailData = {
  post: Post;
  comments: Comment[];
};

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.html'
})
export class PostDetailComponent {
  postDetail$!: Observable<PostDetailData>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {
    this.postDetail$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) =>
        this.postService.getPost(id).pipe(
          switchMap((post) =>
            this.commentService.getCommentsByPost(id).pipe(
              map((res) => ({
                post,
                comments: res.comments
              }))
            )
          )
        )
      )
    );
  }
}
