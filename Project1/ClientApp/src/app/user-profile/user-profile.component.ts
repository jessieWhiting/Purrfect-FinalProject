import { Router, RouterModule } from '@angular/router';
import { UsersService } from './../users.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  users: User[] = [];
  currentUser: User = {} as User;
  email: string = ""; 
  firstName: string = ""; 
  lastName: string = "";
  admin: boolean = false;
  phoneNumber: string = "";
  zipCode: string = "";
  googleId: string = this.user.id;
  
  constructor(private authService: SocialAuthService, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);

    });
  }

  getUserById(googleId: string): void{
    this.userService.getUserById(googleId).subscribe((results: User) => {
      console.log(results);
    })
  }

  registerNewUser(email: string, firstName: string, lastName:string, phoneNumber: string, zipCode: string):void{
    this.userService.createNewUser(email, firstName, lastName, phoneNumber, zipCode, this.user.id).subscribe((result: User)=>{
      console.log(result);
      this.router.navigate([''])
    });
  }

}
