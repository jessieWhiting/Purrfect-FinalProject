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

   AddToFavorites(favorite : Favorite):Observable<Favorite>
   {
    return this.http.post<Favorite>(this.baseURL + this.baseControllerRoute, favorite);
   }
   //Check that this works (:
   ViewAllFavoritePets():Observable<Favorite[]>
   {
    return this.http.get<Favorite[]>(this.baseURL + this.baseControllerRoute);
   }
}