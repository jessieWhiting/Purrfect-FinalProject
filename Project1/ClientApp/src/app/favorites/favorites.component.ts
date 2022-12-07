import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'oidc-client';
import { resourceLimits } from 'worker_threads';
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
  favPet: Animal[] = []; //What are we using to name/display our info
  favPetToDisplay: Animal = {} as Animal;
  allFavoritesDisplayed: boolean = false;
  favorites: Favorite[] = [];
  pets: Animal[] =[];

  constructor(private pfAPI: PetFinderService, private favoriteAPI: FavoritesService, private _ActivatedRoute: ActivatedRoute, private userAPI: UsersService) { 
    this.userName = this._ActivatedRoute.snapshot.paramMap.get("username")!;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

//   GetUserId():void
//   {
//    this.userAPI.GetAllUsers().subscribe((results: User[]) => 
//    {
//      if(this.userName != null)
//          {
//           for(let i = 0; i < results.length; i++)
//            {
//              if (results[i].userName === this.userName)
//              {
//                let id: number = results[i].id;
//                this.CurrentUserFavorites(id);
//              }
//            }
//          }
//    });
//   }

//  AddFavoriteCat();

//  CurrentUserFavorites();

//  RemoveFavoriteCat();





//   ngOnInit(): void {
//   }

 }
