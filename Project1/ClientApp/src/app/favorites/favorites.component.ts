import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite';
import { FavoritesService } from '../favorite.service';
import { PetFinderService } from '../petfinder.service';
import { Animal, PFAPI } from '../PFAnimals';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  userName?: string;
  // favPet: Pets[] = []; //What are we using to name/display our info
  // favPetToDisplay: Pet = {} as PetFinderService;
  // allFavoritesDisplayed: boolean = false;
  favorites: Favorite[] = [];
  favPetsCost: number[] = [];
  favPets: Animal[] = [];
  constructor(private pfAPI: PetFinderService, private favoriteAPI: FavoritesService) { }

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

}
