import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Favorite } from '../favorite';
import { FavoritesService } from '../favorite.service';
import { PetFinderService } from '../petfinder.service';
import { Animal, PFAPI } from '../PFAnimals';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  userName?: string;
  favPet: Favorite[] = []; 
  favPetToDisplay: Animal = {} as Animal;
  // allFavoritesDisplayed: boolean = false;
  favorites: Favorite[] = [];
  favPetsCost: number[] = [];
  favPets: Animal[] = [];
  pets: Animal[] =[];

  constructor(private pfAPI: PetFinderService, private favoriteAPI: FavoritesService, private _ActivatedRoute: ActivatedRoute, private userAPI: UsersService) { 
  this.userName = this._ActivatedRoute.snapshot.paramMap.get("username")!;
 
  this.favoriteAPI.CurrentUserFavorites().subscribe((results: Favorite[]) =>
  {
    this.favPet = results;   
    console.log(results);
  });
  }
  ngOnInit(): void {



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
      petCostLoopI++;
    });
  }

  // GetUserId():void
  // {
  //  this.userAPI.GetAllUsers().subscribe((results: User[]) => 
  //  {
  //    if(this.userName != null)
  //        {
  //         for(let i = 0; i < results.length; i++)
  //          {
  //            if (results[i].email === this.userName)
  //            {
  //              let id: number = results[i].userId;
  //              this.CurrentUserFavorites(id);
  //            }
  //          }
  //        }
  //  });
  // }

 AddFavoritePet(id: number): void{
  let newFavorite : Favorite = {} as Favorite;
  newFavorite.petId = id;
  //newFav.UserId = loggedIn
  this.favoriteAPI.AddFavoritePet(newFavorite).subscribe((result: Favorite)=>
  {
    console.log(result);
    document.getElementById(`fav${id}`);
  });
  
 }

 RemoveFavoritePet(id: number, user: User): void{
  let indexToDelete = -1;
  this.favPet.forEach( f =>
  {
    if((f.petId === id ) && f.petId === id)
    {
      indexToDelete = f.id;
    }
  });
  this.favoriteAPI.RemoveFavoritePet(indexToDelete).subscribe((result: any) => 
  {
    console.log(result);
    document.getElementById(`cat${id}`);
  })

 }

 }
