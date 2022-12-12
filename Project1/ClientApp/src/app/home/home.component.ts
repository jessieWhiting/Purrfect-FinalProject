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
import { Animal, PFAPI,Pagination } from '../PFAnimals';
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

  pageToShow: Pagination[] = [];
  petsToShow:Animal[] = [];
  currentPage: string = "-1";
  previousLink:number = -1;
  nextLink:number = 2;
  pets: Animal [] =[];
  gotPetsYet:boolean = false;
  showZipOnFooter:boolean = false;
  favPet: Favorite[] = []; // list of favorite objects

  
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
    this.routeSub = route.params.subscribe(params => {
      this.currentPage = params['page'];
    });

    // api test 
    fdadrug.testing();
    console.log(RGservice.getPets(1));

    
    
    
    }
    
  ngOnInit(): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);

      this.userAPI.getUserById(this.user.id).subscribe((result : User) => 
      {

      console.log(result);
      this.loggedIn = true;
      this.currentUser = result;
      // get pets here to make sure we have a user or not 
      this.getPetsToShow();
        this.gotPetsYet = true;
      });

    });
    
    

    this.favoriteAPI.CurrentUserFavorites().subscribe((results: Favorite[]) =>
    {
      this.favPet = results;   
      console.log(results);
     
    });  

    if(!this.gotPetsYet){
      this.getPetsToShow();
    }
    
  }

  getPetsToShow():void{
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

    // arrayChanger.favoriteId = parseInt(response.replace(/[^0-9\.]+/g, ""));
    arrayChanger.userId = this.currentUser.userId;
    arrayChanger.catId = id;
    
    
    if (response.includes(`true`))
    {
      this.favPet.push(arrayChanger);
      console.log(this.favPet);
    } else 
    {
      let favToRemove:Favorite = this.favPet.find(fav => fav.catId === id)!;
      let favToRemIndex:number = this.favPet.indexOf(favToRemove);
      this.favPet.splice(favToRemIndex,1);
    }

  }

}