import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PostService } from '../../../core/services/post';
import { UserService } from '../../../core/services/user';
import { Post } from '../../../models/post';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';

type PostWithAuthor = Post & { author?: User };

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],

  templateUrl: './post-list.html',
  styleUrl: './post-list.css'
})
export class PostsListComponent implements OnInit {
  posts: PostWithAuthor[] = [];
  loading = true;
  error = '';

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit(): void {
    forkJoin({
      postsRes: this.postService.getPosts(),
      usersRes: this.userService.getUsers()
    }).subscribe({
      next: ({ postsRes, usersRes }) => {
        const usersMap = new Map<number, User>();
        usersRes.users.forEach((u) => usersMap.set(u.id, u));

        this.posts = postsRes.posts.map((p) => ({
          ...p,
          author: usersMap.get(p.userId)
        }));

        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement.';
        this.loading = false;
      }
    });
  }
}
