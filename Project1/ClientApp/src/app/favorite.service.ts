import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Favorite } from './favorite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  baseURL:string ="";
  baseControllerRoute:string = "";// PUT: /favorites url


  constructor(private http: HttpClient, @Inject ('BASE_URL') private url:string)
   {
      this.baseURL = url;
   }
   //Add a pet to favorites page.
   AddFavoritePet(favorite : Favorite):Observable<Favorite>
   {
    return this.http.post<Favorite>(this.baseURL + this.baseControllerRoute, favorite);
   }
   //Check that this works (:
   //A list of all INDIVIDUAL user favorites.
   CurrentUserFavorites():Observable<Favorite[]>
   {
    return this.http.get<Favorite[]>(this.baseURL + this.baseControllerRoute);
   }

   //Make sure this works. Look into alternative solutions??
   //Later, take in CatId and UserId.
   //Remove FAVORITED pet.
   RemoveFavoritePet(index: number):Observable<Favorite>
   {
    return this.http.delete<Favorite>(this.baseURL + this.baseControllerRoute + '/' + index);
   }

}