import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FDADrugService } from '../fdadrug.service';
import { Animal } from '../PFAnimals';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  petsToShow:Animal[] = [];
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  
  constructor(private fdadrug:FDADrugService, private PFservice:PetfinderService, private authService: SocialAuthService){

    fdadrug.testing();

    this.petsToShow = PFService.getPets(2).animals;



  }



  ngOnInit(): void{
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
