import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  users: User[] = [];
  currentUser: User = {} as User;

  isEditing: boolean = false;
  form!: FormGroup;

  constructor(private userService: UsersService, private fb: FormBuilder, private authService: SocialAuthService) { }
  
  ngOnInit(): void {
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
      // after google login, get our data on user
      this.userService.getUserById(this.user.id).subscribe((result : User) => 
      {
        this.loggedIn = true;
        this.currentUser = result;
      });
    });

    this.form = this.fb.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      zipCode: [''],
    });
  }
  
  onSubmit(){
    this.updateUserInfo();
  }

  updateUserInfo(){
    console.log(this.currentUser);
    this.userService.updateUserInfo(this.currentUser.userId, this.currentUser).subscribe((result) =>{
      this.currentUser = result;
    });
  }

}
