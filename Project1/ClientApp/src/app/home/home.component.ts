import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  currentPage: string = "-1";
  previousLink:number = -1;
  nextLink:number = -1;
  pets: Animal [] =[];
  
  private routeSub: Subscription;
  
  constructor(private fdadrug:FDADrugService, 
              private PFservice:PetFinderService,
              private RGservice:RescueGroupsService,
              private authService:SocialAuthService,
              private route: ActivatedRoute,
              private router: Router){
    this.routeSub = route.params.subscribe(params => {
      this.currentPage = params['page'];
    });

    fdadrug.testing();

    if (this.currentPage === undefined) {
      PFservice.getPets(1).subscribe((results:PFAPI)=>{
        this.petsToShow = results.animals;
        this.pageToShow.push(results.pagination);
      });
      this.nextLink = 2;
    } else {
      PFservice.getPets(parseInt(this.currentPage)).subscribe((results:PFAPI)=>{
        this.petsToShow = results.animals;
        this.pageToShow.push(results.pagination);

      });
      this.nextLink = parseInt(this.currentPage) + 1;
      this.previousLink = parseInt(this.currentPage) - 1;
    }

    // footer link fixing 
    
    
    RGservice.getPets();
  }


  ngOnInit(): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
    });

    console.log(`second in line ${this.petsToShow[1]}`);
  }

}