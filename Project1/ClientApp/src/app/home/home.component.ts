import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FDADrugService } from '../fdadrug.service';
import { PetFinderService } from '../petfinder.service';
import { Animal, PFAPI,Pagination } from '../PFAnimals';
import { RescueGroupsService } from '../rescue-groups.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  pageToShow: Pagination[] = [];
  petsToShow:Animal[] = [];
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  pets: Animal [] =[];
  
  constructor(private fdadrug:FDADrugService, 
              private PFservice:PetFinderService,
              private RGservice:RescueGroupsService,
              private authService:SocialAuthService,){

    fdadrug.testing();

    PFservice.getPets(3).subscribe((results:PFAPI)=>{
      this.petsToShow = results.animals;
      //set up routing for page 3 to have access to pages.
      //if there is no page, DEFAULT to 1 (:
     
    })

    RGservice.getPets();
  }


  ngOnInit(): void{
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
    });

    console.log(`second in line ${this.petsToShow[1]}`);
  }
}