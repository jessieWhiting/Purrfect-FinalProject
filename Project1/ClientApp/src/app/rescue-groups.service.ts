import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret } from './secret';

@Injectable({
  providedIn: 'root'
})
export class RescueGroupsService {

  url:string = `https://api.rescuegroups.org/v5/`;

  RGHeaders = new HttpHeaders({'Content-Type':'application/vnd.api+json',
                              'Authorization':`${Secret.RescueKey}`});

  constructor(private http: HttpClient) { }

  getPets(page:number){
    this.http.get<any>(`${this.url}`+`public/animals/search/available/cats/?page=`+page+`&limit=10`, {headers: this.RGHeaders}).subscribe((results:any)=>{
      console.log(results);

    });
  }

}
