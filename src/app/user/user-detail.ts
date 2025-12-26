import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../service/user-service';
import { PostService } from '../service/post-service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail implements OnInit {
  user: any = null;
  posts: any[] = [];
  loading = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private postService: PostService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.loading = true;
    this.userService.getUser(id).subscribe({
      next: (u) => {
        this.user = u;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading user:', err);
        this.loading = false;
      },
    });

    this.postService.getPostsByUser(id).subscribe({
      next: (res) => {
        this.posts = res.posts || [];
      },
    });
  }
}
