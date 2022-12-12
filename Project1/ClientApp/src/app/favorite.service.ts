import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Favorite } from './favorite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  baseURL:string ="";
  baseControllerRoute:string = "api/Favorites";


  constructor(private http: HttpClient, @Inject ('BASE_URL') private url:string)
   {
      this.baseURL = url;
   }
   //Add a pet to favorites page.
   AddFavoritePet(favorite : Favorite):Observable<Favorite>
   {
    return this.http.post<Favorite>(this.baseURL + this.baseControllerRoute, favorite);
   }

   // puts fav obj on top of old one
   //unfinshed mayb?
   ChangeNote(favorite:Favorite){
    return this.http.put<Favorite>(this.baseURL + this.baseControllerRoute+'/'+favorite.favoriteId, favorite);
   }


   
   //A list of all INDIVIDUAL user favorites.
   // this is sorta legacy it gets all favorites
   CurrentUserFavorites():Observable<Favorite[]>
   {
    return this.http.get<Favorite[]>(this.baseURL + this.baseControllerRoute);
   }
   // new user favs, only by 1 user
   CurrentUserFavoritesById(id:number):Observable<Favorite[]>
   {
    return this.http.get<Favorite[]>(this.baseURL + this.baseControllerRoute + '/User/'+ id);
   }


   //Make sure this works. Look into alternative solutions??
   //Later, take in CatId and UserId.
   //Remove FAVORITED pet.
   RemoveFavoritePet(index: number):Observable<Favorite>
   {
    return this.http.delete<Favorite>(this.baseURL + this.baseControllerRoute + '/' + index);
   }

  //  SaveNote(id : number, note: string): Observable<Favorite[]> {
  //   return this.http.put<Favorite[]>(this.baseURL + this.baseControllerRoute + '/' + id);
    

   

}