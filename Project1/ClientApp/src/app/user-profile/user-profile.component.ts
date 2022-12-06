import { UsersService } from './../users.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  
  constructor(private authService: SocialAuthService, private userService: UsersService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  // getUsers(): void{
  //   this.userService.getUsers().subscribe((results: User))
  // }

}
