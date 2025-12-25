import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';

import { UserService } from '../../../core/services/user';
import { PostService } from '../../../core/services/post';
import { User } from '../../../models/user';
import { Post } from '../../../models/post';

type UserDetailData = {
  user: User;
  posts: Post[];
};

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetailComponent {
  userDetail$!: Observable<UserDetailData>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {
    this.userDetail$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) =>
        this.userService.getUser(id).pipe(
          switchMap((user) =>
            this.postService.getPostsByUser(id).pipe(
              map((res) => ({
                user,
                posts: res.posts
              }))
            )
          )
        )
      )
    );
  }
}
