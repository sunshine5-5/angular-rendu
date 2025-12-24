import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../../core/services/post';
import { CommentService } from '../../../core/services/comment';
import { Post } from '../../../models/post';
import { Comment } from '../../../models/comment';
@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css'
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getPost(id).subscribe(post => {
      this.post = post;
    });

    this.commentService.getCommentsByPost(id).subscribe(res => {
      this.comments = res.comments;
    });
  }
}
