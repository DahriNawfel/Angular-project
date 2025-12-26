import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../service/post-service';
import { CommentService } from '../service/comment-service';
import { UserService } from '../service/user-service';

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
    this.postService.getPost(id).subscribe({
      next: (p) => {
        this.post = p;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading post:', err);
        this.loading = false;
      },
    });
    this.commentService.getCommentsByPost(id).subscribe({
      next: (r) => {
        this.comments = r.comments || [];
      },
    });
  }
}
