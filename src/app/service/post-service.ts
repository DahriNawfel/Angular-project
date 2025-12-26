import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private base = 'https://dummyjson.com';
  constructor(private http: HttpClient) {}

  getPosts(limit = 0): Observable<{posts: Post[]}> {
    const q = limit ? `?limit=${limit}` : '';
    return this.http.get<{posts: Post[]}>(`${this.base}/posts${q}`);
  }

  getPostsByUser(userId: number): Observable<{posts: Post[]}> {
    return this.http.get<{posts: Post[]}>(`${this.base}/posts/user/${userId}`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.base}/posts/${id}`);
  }
}
