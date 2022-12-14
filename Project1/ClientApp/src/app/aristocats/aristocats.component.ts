import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicCatInfo } from '../basicCatInfo';
import { CatInfoComponent } from '../cat-info/cat-info.component';
import { CatService } from '../cat.service';
import { Favorite } from '../favorite';
import { FavoriteButtonService } from '../favorite-button.service';
import { FavoritesService } from '../favorite.service';
import { PetFinderService } from '../petfinder.service';
import { Animal } from '../PFAnimals';
import { User } from '../user';
import { UsersService } from '../users.service';
import { PFSingle } from '../PFSingle';

@Component({
  selector: 'app-aristocats',
  templateUrl: './aristocats.component.html',
  styleUrls: ['./aristocats.component.css']
})
export class AristocatsComponent implements OnInit {

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  currentUser: User = {} as User;
  petsToShow:Animal[] = [];
  favPet: Favorite[] = []; // list of favorite objects
  isCatFavorited: Map<number, boolean> = new Map();
  catPoints:BasicCatInfo[] = [];

  constructor(private PFservice:PetFinderService,
              private authService:SocialAuthService,
              private route: ActivatedRoute,
              private router: Router,
              private favoriteAPI: FavoritesService,
              private favoriteButtonAPI: FavoriteButtonService,
              private userAPI: UsersService,
              private catInfoAPI: CatService) { }

  ngOnInit(): void {
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
    
    this.catInfoAPI.GetCatDb().subscribe((results: BasicCatInfo[]) => {
      this.catPoints = results;
      this.catPoints.forEach(cat => {
        if(cat.points > 0){
          this.PFservice.getSpecificPet(cat.petId.toString()).subscribe((results:PFSingle) => {
            this.petsToShow.push(results.animal);
          });
        }
        console.log()
        this.catPoints.sort(function (a,b) {
          return a.points - b.points;
        });
        // put petstoshow in order of the ids to the ids of the catPoints array
        
      });
    });
  }

  pointCount(id:number):string{
    let output:string = ``;
    this.catPoints.forEach(cat => {
      output = output.concat(cat.points.toString());
    });
    return output;
  }


}
