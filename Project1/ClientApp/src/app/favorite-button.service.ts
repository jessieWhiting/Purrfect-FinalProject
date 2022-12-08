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
  
  AddFavoritePet(id: number, currentUserId: number, favPet: Favorite[]): void{
    let newFavorite : Favorite = {} as Favorite;
    let newCat : BasicCatInfo = {} as BasicCatInfo;
    newCat.petId = id;
    newCat.shelterId = 17;
    newFavorite.catId = id;
    newFavorite.userId = currentUserId;
    console.log(newCat);
  
    this.basicCatInfo.AddNewCat(newCat).subscribe(() =>
    {
      let identifiedPet : boolean = true;
      favPet.forEach(pet => 
        {
        if(pet.catId === id)
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
        this.RemoveFavoritePet(id, favPet);
      }
    });  
   }
  
   //Delete a favorited pet from user's saved favorites
   RemoveFavoritePet(id: number, favPet: Favorite[]): void{
    let indexToDelete = -1;
    favPet.forEach( f =>
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
}
