import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PostService } from '../../../core/services/post';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css'
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.posts = res.posts;
    });
  }
}
