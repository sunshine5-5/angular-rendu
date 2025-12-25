import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../../core/services/post';
import { CommentService } from '../../../core/services/comment';
import { UserService } from '../../../core/services/user';
import { Post } from '../../../models/post';
import { Comment } from '../../../models/comment';
import { User } from '../../../models/user';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css'
})
export class PostDetailComponent implements OnInit {
  post?: Post;
  author?: User;
  comments: Comment[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getPost(id).subscribe({
      next: (p: Post) => {
        this.post = p;

        this.userService.getUser(p.userId).subscribe({
          next: (u: User) => (this.author = u)
        });

        this.commentService.getCommentsByPost(p.id).subscribe({
          next: (res) => {
            this.comments = res.comments;
            this.loading = false;
          },
          error: () => {
            this.error = "Erreur lors du chargement des commentaires.";
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = "Post introuvable.";
        this.loading = false;
      }
    });
  }
}
