import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../service/post-service';
import { CommentService } from '../service/comment-service';
import { UserService } from '../service/user-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail implements OnInit {
  post: any = null;
  comments: any[] = [];
  loading = false;

  constructor(private route: ActivatedRoute, private postService: PostService, private commentService: CommentService, private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.loading = true;
    
    forkJoin({
      post: this.postService.getPost(id),
      comments: this.commentService.getCommentsByPost(id),
      users: this.userService.getAllUsers()
    }).subscribe({
      next: ({ post, comments, users }) => {
        this.post = post;
        
        const userMap = new Map();
        (users.users || []).forEach((u: any) => {
          const name = u.firstName && u.lastName 
            ? `${u.firstName} ${u.lastName}` 
            : u.firstName || u.lastName || u.username || u.name || `User #${u.id}`;
          userMap.set(u.id, name);
        });
        
        this.comments = (comments.comments || []).map((c: any) => ({
          ...c,
          authorName: userMap.get(c.user?.id || c.userId) || c.user?.username || `User #${c.user?.id || c.userId}`
        }));
        
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading post:', err);
        this.loading = false;
      },
    });
  }
}
