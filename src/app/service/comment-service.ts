import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private base = 'https://dummyjson.com';
  constructor(private http: HttpClient) {}

  getCommentsByPost(postId: number): Observable<{comments: Comment[]}> {
    return this.http.get<{comments: Comment[]}>(`${this.base}/comments/post/${postId}`);
  }
}
