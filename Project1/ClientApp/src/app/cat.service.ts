import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicCatInfo } from './basicCatInfo';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  baseURL:string ="";
  baseControllerRoute:string = "api/Cats";

  constructor(private http: HttpClient, @Inject ('BASE_URL') private url:string) 
  {
     this.baseURL = url; 
  }

  AddNewCat(cat: BasicCatInfo):Observable<BasicCatInfo>
  {
    this.http.get<BasicCatInfo>(this.baseURL + this.baseControllerRoute).subscribe((result : BasicCatInfo) =>
    {
      if(result === cat)
      {
        return alert('helllloooo');
      }
      else
      {
        return this.http.post<BasicCatInfo>(this.baseURL + this.baseControllerRoute , cat);
      }
    })
    console.log(cat);
    return this.http.get<BasicCatInfo>(this.baseURL + this.baseControllerRoute);
  }

}
