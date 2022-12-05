import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite';
import { FavoritesService } from '../favorite.service';
import { PetFinderService } from '../petfinder.service';
import { PFAPI } from '../PFAnimals';

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

  constructor(private pfAPI: PetFinderService, private favoriteAPI: FavoritesService) { }

  ngOnInit(): void {
  }

}
