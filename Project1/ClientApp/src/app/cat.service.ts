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
    let inDB:boolean = false;
    this.http.get<BasicCatInfo[]>(this.baseURL + this.baseControllerRoute).subscribe((result : BasicCatInfo[]) =>
    {
      result.forEach(element => {
        if(element.petId === cat.petId){
          inDB = true;
        }
      });
    });
    if(inDB)
      {
        console.log("cat registered already!")
        return this.http.get<BasicCatInfo>(this.baseURL + this.baseControllerRoute +'/'+cat.petId);
      }
      else {
        console.log("posting")
        return this.http.post<BasicCatInfo>(this.baseURL + this.baseControllerRoute, cat);
      }
  }

  AddPoint(cat:BasicCatInfo):Observable<BasicCatInfo>
  {
    return this.http.put<BasicCatInfo>(this.baseURL+ this.baseControllerRoute +'/'+ cat.petId, cat);
  }

  GetCatDb():Observable<BasicCatInfo[]>
  {
    return this.http.get<BasicCatInfo[]>(this.baseURL+ this.baseControllerRoute);
  }
}
