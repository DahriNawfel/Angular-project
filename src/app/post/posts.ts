import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../service/post-service';
import { UserService } from '../service/user-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  posts: any[] = [];
  loading = false;
  constructor(private postService: PostService, private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loading = true;
    forkJoin({
      posts: this.postService.getPosts(),
      users: this.userService.getAllUsers()
    }).subscribe({
      next: ({ posts, users }) => {
        const userMap = new Map();
        (users.users || []).forEach((u: any) => {
          const name = u.firstName && u.lastName 
            ? `${u.firstName} ${u.lastName}` 
            : u.firstName || u.lastName || u.username || u.name || `User #${u.id}`;
          userMap.set(u.id, name);
        });
        this.posts = (posts.posts || []).map((p: any) => ({
          ...p,
          authorName: userMap.get(p.userId) || `User #${p.userId}`
        }));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.loading = false;
      },
    });
  }
}
