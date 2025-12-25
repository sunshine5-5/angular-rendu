import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user';
import { PostService } from '../../../core/services/post';
import { User } from '../../../models/user';
import { Post } from '../../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],


  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetailComponent implements OnInit {
  user?: User;
  posts: Post[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUser(id).subscribe({
      next: (u) => (this.user = u),
      error: () => (this.error = "Utilisateur introuvable.")
    });

    this.postService.getPostsByUser(id).subscribe({
      next: (res) => {
        this.posts = res.posts;
        this.loading = false;
      },
      error: () => {
        this.error = "Erreur lors du chargement des posts.";
        this.loading = false;
      }
    });
  }
}
