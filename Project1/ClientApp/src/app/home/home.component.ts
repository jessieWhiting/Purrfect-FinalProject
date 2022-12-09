import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Favorite } from '../favorite';
import { FavoriteButtonService } from '../favorite-button.service';
import { FavoritesService } from '../favorite.service';
import { FDADrugService } from '../fdadrug.service';
import { PetFinderService } from '../petfinder.service';
import { Animal, PFAPI,Pagination } from '../PFAnimals';
import { RescueGroupsService } from '../rescue-groups.service';
import { User } from '../user';
import { UsersService } from '../users.service';


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

  favPet: Favorite[] = []; // list of favorite objects
  currentUser: User = {} as User;
  
  private routeSub: Subscription;
  
  constructor(private fdadrug:FDADrugService, 
              private PFservice:PetFinderService,
              private RGservice:RescueGroupsService,
              private authService:SocialAuthService,
              private route: ActivatedRoute,
              private router: Router,
              private favoriteAPI: FavoritesService,
              public favoriteButtonAPI: FavoriteButtonService,
              private userAPI: UsersService,){
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
       
    RGservice.getPets1();
    this.favoriteAPI.CurrentUserFavorites().subscribe((results: Favorite[]) =>
    {
      this.favPet = results;   
      console.log(results);
     
    });  
    }
    
  ngOnInit(): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.userAPI.getUserById(this.user.id).subscribe((result : User) => 
    {

      console.log(result);
      this.loggedIn = true;
      this.currentUser = result;
     
    });

    console.log(`second in line ${this.petsToShow[1]}`);
  }

}