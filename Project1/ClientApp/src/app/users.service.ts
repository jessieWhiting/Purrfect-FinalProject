import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  static user: SocialUser;
  endPoint: string = "api/Users";

  constructor(@Inject("BASE_URL") private baseUrl: string, private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}${this.endPoint}`);
  }

  getUserById(googleId: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}${this.endPoint}${googleId}`);
  }
}
