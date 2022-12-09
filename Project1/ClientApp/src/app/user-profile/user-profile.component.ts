import { Router, ActivatedRoute } from '@angular/router';
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
      this.authService.authState.subscribe((user: SocialUser)=>{
        this.user = user;
        this.loggedIn = (user != null);
        this.loginUser(this.user.id);

        this.getUserById(this.user.id);
      });
    this.getAllUsers();
  };

  getAllUsers(): void{
    this.userService.getAllUsers().subscribe((results: User[]) => {
      this.users = results;
      console.log(this.users);
    });
  }

  getUserById(googleId: string): void{
    this.userService.getUserById(googleId).subscribe((results: User) => {
      console.log(results);
      this.currentUser = results;
    });
  }

  //logs user in with google id
  loginUser(id:string): void{
    for(let i = 0; i < this.users.length; i++){
      if(id === this.users[i].googleId){
        this.currentUser = this.users[i];
        console.log(this.currentUser);
      }
    }
  }

  //Registers new user to update the SQL database
  registerNewUser(email: string, firstName: string, lastName:string, phoneNumber: string, zipCode: string):void{
    this.userService.createNewUser(email, firstName, lastName, phoneNumber, zipCode, this.user.id).subscribe((result: User)=>{
      console.log(result);
      this.router.navigate(['/']);
    });
  }
}
