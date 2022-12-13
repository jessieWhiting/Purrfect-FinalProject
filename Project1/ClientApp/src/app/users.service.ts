import { first, Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  static user: SocialUser = {} as SocialUser;
  endPoint: string = "api/Users";
  

  constructor(@Inject("BASE_URL") private baseUrl: string, private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + this.endPoint);
  }

  getUserById(googleId: string): Observable<User>{
    return this.http.get<User>(this.baseUrl + this.endPoint + '/' + googleId);
  }

  createNewUser(email: string, firstName: string, lastName: string, phoneNumber: string, zipCode: string, googleId: string): Observable<User>{
    let newAdmin: boolean = false;
    let newUser: User = {userId:0, email: email, firstName: firstName, lastName: lastName, admin: newAdmin, phoneNumber: phoneNumber, zipCode: zipCode, googleId: googleId}
    return this.http.post<User>(this.baseUrl + this.endPoint, newUser);
  }

  updateUserInfo(userId: number, user: User): Observable<User>{
    return this.http.put<User>(this.baseUrl + this.endPoint + '/' + userId, user);
  }
}
