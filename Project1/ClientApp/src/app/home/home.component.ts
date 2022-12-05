import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FDADrugService } from '../fdadrug.service';
import { Animal } from '../PFAnimals';
import { PetFinderService } from '../petfinder.service';
import { RescueGroupsService } from '../rescue-groups.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {


  petsToShow:Animal[] = [];
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  
  constructor(private fdadrug:FDADrugService, 
              private PFservice:PetFinderService, 
              private authService: SocialAuthService,
              private RGservice:RescueGroupsService,){

    fdadrug.testing();

    this.petsToShow = PFservice.getPets(2).animals;

    RGservice.getPets();


  }



  ngOnInit(): void{
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
    });
  }


}