import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base = 'https://dummyjson.com';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<{users: User[]}> {
    return this.http.get<{users: User[]}>(`${this.base}/users`);
  }

  getAllUsers(): Observable<{users: User[]}> {
    return this.http.get<{users: User[]}>(`${this.base}/users?limit=0`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.base}/users/${id}`);
  }
}
