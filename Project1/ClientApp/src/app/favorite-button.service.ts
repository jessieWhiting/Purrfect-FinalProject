import { Injectable } from '@angular/core';
import { BasicCatInfo } from './basicCatInfo';
import { CatService } from './cat.service';
import { Favorite } from './favorite';
import { FavoritesService } from './favorite.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteButtonService {
  
  
  constructor(private favoriteAPI: FavoritesService, private basicCatInfo: CatService, )   { }
  
  ToggleFavoritePet(id: number, currentUserId: number, favPet: Favorite[]): string {
    let newFavorite : Favorite = {} as Favorite;
    let newCat : BasicCatInfo = {} as BasicCatInfo;
    newCat.petId = id;
    newCat.shelterId = 17;
    newFavorite.catId = id;
    newFavorite.userId = currentUserId;

    let identifiedPet : boolean = true;
    favPet.forEach(pet => 
      {
      if(pet.catId === id)
      {
        identifiedPet = false;
      }
    });

    let favResponse:Favorite = {} as Favorite;
    this.basicCatInfo.AddNewCat(newCat).subscribe(() =>
    {
      if(identifiedPet === true)
      {
        this.favoriteAPI.AddFavoritePet(newFavorite).subscribe((result: Favorite)=>
        {
          document.getElementById(`favButton${id}`)!.innerHTML = 'added to favorites';
          console.log(result)
          // return 'added';
          favResponse = result;
          console.log(favResponse.favoriteId);
        })
      }
      else
      {
        this.RemoveFavoritePet(id, favPet, currentUserId);
        // return 'removed';
      }
      
    })
    let output:string = `${identifiedPet}*${favResponse.favoriteId}`
    return output;
   }
  
   //Delete a favorited pet from user's saved favorites
   RemoveFavoritePet(id: number, favPet: Favorite[], currentUserId:number): void{
    let indexToDelete = -1;
    favPet.forEach( f =>
    {
      if((f.catId === id ) && (f.userId === currentUserId))
      {
        indexToDelete = f.favoriteId;
      }
    });
    this.favoriteAPI.RemoveFavoritePet(indexToDelete).subscribe((result: any) => 
    {
      document.getElementById(`favButton${id}`)!.innerHTML = 'removed to favorites';
    })
}
}
