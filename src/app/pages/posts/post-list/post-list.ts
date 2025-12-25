import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { PostService } from '../../../core/services/post';
import { Post } from '../../../models/post';

type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css'
})
export class PostsListComponent {
  posts$!: Observable<PostsResponse>;

  constructor(private postService: PostService) {
   
    this.posts$ = this.postService.getPosts();
  }
}
