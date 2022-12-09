import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Favorite } from '../favorite';
import { FavoritesService } from '../favorite.service';
import { PetFinderService } from '../petfinder.service';
import { Animal, PFAPI } from '../PFAnimals';
import { UsersService } from '../users.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { PFSingle } from '../PFSingle';
import { BasicCatInfo } from '../basicCatInfo';
import { CatService } from '../cat.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  // userName: string;
  favPet: Favorite[] = []; // list of favorite objects
  favPets: Animal[] = []; // the cats we are going to display that we got from the list
  
  favPetsCost: number[] = [];
  pets: Animal[] =[];

  //test string
  currentUser: User = {} as User;

  user: SocialUser = {} as SocialUser;//Gets googleID.
  loggedIn: boolean = false;//Checks for logged in user.

  constructor(private pfAPI: PetFinderService, private favoriteAPI: FavoritesService, private _ActivatedRoute: ActivatedRoute, 
    private userAPI: UsersService, private authService: SocialAuthService, private basicCatInfo: CatService) 
  { 
 
 
  this.favoriteAPI.CurrentUserFavorites().subscribe((results: Favorite[]) =>
  {
    this.favPet = results;   
    console.log(results);
    this.favPet.forEach(f => {
      // true should be a shelter id maybe? should that be in favorites or should we be checking against the cats table? cause im not sure how to acheive that...
      if(true)
      this.pfAPI.getSpecificPet(f.catId.toString()).subscribe((results:PFSingle) => {
        this.favPets.push(results.animal);

        // favPetsCost """algorithm"""
        let petCostLoopI:number = 0;
        this.favPets.forEach(f => {
        // getting cost
        let count:number = 1;
        if(f.attributes.shots_current){
          count += .5;
        }
        if(f.attributes.spayed_neutered){
          count += 1;
        }
        if(f.attributes.special_needs){
          count += .5;
        }
        if(f.species === "idk yet lol"){

        }
        if(f.size === "Large"){
          count += .5;
        }

        // would like to do something with breed costs here and hopefully insurance !!

        this.favPetsCost[petCostLoopI] = count;
        console.log("count "+count)
        petCostLoopI++;
    });

      });
    });
  });
  }

  //Factoring cost in for pets medical needs.
  ngOnInit(): void {

      this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
      // console.log(this.user);

      this.userAPI.getUserById(this.user.id).subscribe((result : User) => 
      {
        console.log(result);
        this.loggedIn = true;
        this.currentUser = result;
      });

    });
  }


//Add a favorited pet from user's saved favorites
 AddFavoritePet(id: number): void{
  let newFavorite : Favorite = {} as Favorite;
  let newCat : BasicCatInfo = {} as BasicCatInfo;
  newCat.petId = id;
  newCat.shelterId = 17;
  newFavorite.catId = id;
  newFavorite.userId = this.currentUser.userId;
  console.log(newCat);

  this.basicCatInfo.AddNewCat(newCat).subscribe(() =>
  {
    let identifiedPet : boolean = true;
    this.favPets.forEach(pet => 
      {
      if(pet.id === id)
      {
        identifiedPet = false;
      }
    });
    if(identifiedPet === true)
    {

      this.favoriteAPI.AddFavoritePet(newFavorite).subscribe((result: Favorite)=>
      {       
        console.log(result);
        document.getElementById(`fav${id}`);     
      });
    }
    else
    {
      this.RemoveFavoritePet(id);
    }
  });  
 }

 //Delete a favorited pet from user's saved favorites
 RemoveFavoritePet(id: number): void{
  let indexToDelete = -1;
  this.favPet.forEach( f =>
  {
    if((f.catId === id ) && f.catId === id)
    {
      indexToDelete = f.favoriteId;
    }
  });
  this.favoriteAPI.RemoveFavoritePet(indexToDelete).subscribe((result: any) => 
  {
    console.log(result);
    document.getElementById(`cat${id}`);
  })

 }
 SaveNote(note:string, id:number)
 {
  // send to api to PUT the note, maybe need to make a new fav object and the overwrite it! 
 }

GetNote(id : number): string
{
  console.log(this.favPet.find(fav => fav.catId === id));
   return this.favPet.find(fav => fav.catId === id)?.note!;
}

 }
