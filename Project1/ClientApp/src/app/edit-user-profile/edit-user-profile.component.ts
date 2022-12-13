import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  user: User = {} as User;
  isEditing: boolean = false;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  updateUserInfo(){
    this.isEditing = !this.isEditing;
    this.userService.updateUserInfo(this.user.userId, this.user).subscribe((result) =>{
      this.user = result;
    })
  }

}
