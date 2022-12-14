import { UsersService } from './../users.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Favorite } from '../favorite';
import { FavoriteButtonService } from '../favorite-button.service';
import { FavoritesService } from '../favorite.service';
import { FDADrugService } from '../fdadrug.service';
import { PetFinderService } from '../petfinder.service';
import { Animal, PFAPI, Pagination } from '../PFAnimals';
import { RescueGroupsService } from '../rescue-groups.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  currentUser: User = {} as User;

  petsToShow:Animal[] = [];
  favPet: Favorite[] = []; // list of favorite objects
  isCatFavorited: Map<number, boolean> = new Map();

  pageToShow: Pagination[] = [];
  currentPage: string = "-1";
  previousLink:number = -1;
  nextLink:number = 2;
  gotPetsYet:boolean = false; // checks if pets have been gotten with user's zip code
  showZipOnFooter:boolean = false;
    
  private routeSub: Subscription;
  
  constructor(private fdadrug:FDADrugService, 
              private PFservice:PetFinderService,
              private RGservice:RescueGroupsService,
              private authService:SocialAuthService,
              private route: ActivatedRoute,
              private router: Router,
              private favoriteAPI: FavoritesService,
              private favoriteButtonAPI: FavoriteButtonService,
              private userAPI: UsersService,){
    // get page number
    this.routeSub = route.params.subscribe(params => {
      this.currentPage = params['page'];
    });

    // api test 
    fdadrug.testing();
    console.log(RGservice.getPets(1));
  }
    
  ngOnInit(): void{
    // get google user
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
      // after google login, get our data on user
      this.userAPI.getUserById(this.user.id).subscribe((result : User) => 
      {
        this.loggedIn = true;
        this.currentUser = result;
        // if we have a user we'll try to get pets by zip code here and confirm that
        this.getPetsToShow();
        this.gotPetsYet = true;
      });
    });

    // gets the list of favorites to check when adding/removing favorites
    this.favoriteAPI.CurrentUserFavorites().subscribe((results: Favorite[]) =>
    {
      this.favPet = results;
      results.forEach(fav => {
        this.isCatFavorited.set(fav.catId, true);
      });
    });  

    // if the user was not logged in, this will make sure we have some pets on the page
    if(!this.gotPetsYet){
      this.getPetsToShow();
    }
  }

  getPetsToShow():void{
    // checks if there is a user to search by zip code
    let noUser:boolean = true;
    if(this.loggedIn && (this.currentUser.zipCode.length === 5)){
      noUser = false;
    }
    if(noUser){
      console.log("not logged in, getting pets anywhere")
      if (this.currentPage === undefined) {
        this.PFservice.getPets(1).subscribe((results:PFAPI)=>{
          this.petsToShow = results.animals;
          this.pageToShow.push(results.pagination);
        });
        this.nextLink = 2;
      } else {
        this.PFservice.getPets(parseInt(this.currentPage)).subscribe((results:PFAPI)=>{
          this.petsToShow = results.animals;
          this.pageToShow.push(results.pagination);
        });
        // set navigation links
        this.nextLink = parseInt(this.currentPage) + 1;
        this.previousLink = parseInt(this.currentPage) - 1;
      }
    }
    else{
      console.log("logged in and has zip code"+this.currentUser.zipCode)
      this.showZipOnFooter = true;
      if (this.currentPage === undefined) {
        this.PFservice.getPetsByZip(1, this.currentUser.zipCode).subscribe((results:PFAPI)=>{
          this.petsToShow = results.animals;
          this.pageToShow.push(results.pagination);
        });
        this.nextLink = 2;
      } else {
        this.PFservice.getPetsByZip(parseInt(this.currentPage), this.currentUser.zipCode).subscribe((results:PFAPI)=>{
          this.petsToShow = results.animals;
          this.pageToShow.push(results.pagination);
        });
        // set navigation links
        this.nextLink = parseInt(this.currentPage) + 1;
        this.previousLink = parseInt(this.currentPage) - 1;
      }
    }
  }

  AddFavoritePet(id:number):void {
    let response:string = this.favoriteButtonAPI.ToggleFavoritePet(id, this.currentUser.userId, this.favPet);
    let arrayChanger:Favorite = {} as Favorite;
    arrayChanger.userId = this.currentUser.userId;
    arrayChanger.catId = id;
    
    if (response.includes(`true`))
    {
      this.favPet.push(arrayChanger);
      this.isCatFavorited.set(id, true);
      // console.log(this.favPet);
    } else 
    {
      let favToRemove:Favorite = this.favPet.find(fav => (fav.catId === id)  && (fav.userId === this.currentUser.userId))!;
      let favToRemIndex:number = this.favPet.indexOf(favToRemove);
      this.favPet.splice(favToRemIndex,1);
      this.isCatFavorited.set(id, false);
    }
  }
}