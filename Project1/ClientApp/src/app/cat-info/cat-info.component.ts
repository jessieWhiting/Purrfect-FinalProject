import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Favorite } from '../favorite';
import { FavoriteButtonService } from '../favorite-button.service';
import { FavoritesService } from '../favorite.service';
import { PetFinderService } from '../petfinder.service';
import { Animal } from '../PFAnimals';
import { PFSingle } from '../PFSingle';
import { RescueGroupsService } from '../rescue-groups.service';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-cat-info',
  templateUrl: './cat-info.component.html',
  styleUrls: ['./cat-info.component.css']
})
export class CatInfoComponent implements OnInit {
  catID:string = "-1";
  shelterID:string = "-1";
  catData:Animal = {} as Animal;

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  currentUser: User = {} as User;
  favPet: Favorite[] = []; // list of favorite objects

  private routeSub: Subscription;

  constructor(private favoriteAPI: FavoritesService,
              private PFservice:PetFinderService,
              private RGservice:RescueGroupsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService:SocialAuthService,
              private userAPI: UsersService,
              private favoriteButtonAPI: FavoriteButtonService,) 
  {
    // get the pet id and which api to get from 
    this.routeSub = route.params.subscribe(params => {
      this.shelterID = params['shelter'];
      this.catID = params['cat'];
    });
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
      // after google login, get our data on user
      this.userAPI.getUserById(this.user.id).subscribe((result : User) => 
      {
        this.loggedIn = true;
        this.currentUser = result;
      });
    });
    
    
    // checks which api has pet data and then gets it
    if(this.shelterID === "17"){
      this.PFservice.getSpecificPet(this.catID).subscribe((results:PFSingle)=>{
        this.catData = results.animal
      });
    }
    else if(this.shelterID === "-1"){
      // test
    } else {
      console.log("what api is this for?????")
    }

    this.favoriteAPI.CurrentUserFavorites().subscribe((results: Favorite[]) =>
    {
      this.favPet = results;
    });
  }

  AddFavoritePet(id:number):void {
    let response:string = this.favoriteButtonAPI.ToggleFavoritePet(id, this.currentUser.userId, this.favPet);
    let arrayChanger:Favorite = {} as Favorite;
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
