import { Subscription } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormControl, FormGroup, FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: EditUserProfileComponent
    }]
})
export class EditUserProfileComponent implements OnInit {

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

  isEditing: boolean = false;

  form: FormGroup = {} as FormGroup;

  // form = this.fb.group({
  //   firstName: [''],
  //   lastName: [''],
  //   email: [''],
  //   phoneNumber: [''],
  //   zipCode: [''],
  // });
  
  constructor(private userService: UsersService, private fb: FormBuilder, private authService: SocialAuthService) { }
  
  ngOnInit(): void {
    this.isEditing = false;
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
      
      // after google login, get our data on user
      this.userService.getUserById(this.user.id).subscribe((result : User) => 
      {
        // this.form.value.firstName = this.currentUser.firstName;
        this.form = this.fb.group({
            firstName: new FormControl(result.firstName),
            lastName: new FormControl(result.lastName),
            email: new FormControl(result.email),
            phoneNumber: new FormControl(result.phoneNumber),
            zipCode: new FormControl(result.zipCode),
          });
        this.loggedIn = true;
        
        this.currentUser = result;
      });
    });
  }
  onSubmit(){
    this.updateUserInfo();
  }

  updateUserInfo(){
    console.log(this.currentUser);
    let formUser: User = this.form.value as User;
    formUser.googleId = this.currentUser.googleId;
    formUser.admin = this.currentUser.admin;
    formUser.userId = this.currentUser.userId;
    this.userService.updateUserInfo(this.currentUser.userId, formUser).subscribe((result: User) =>{
      console.log(result);
      console.log(this.currentUser);
    });
  }

}
