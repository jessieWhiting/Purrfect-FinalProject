import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret } from './secret';

@Injectable({
  providedIn: 'root'
})
export class RescueGroupsService {

  url:string = `https://api.rescuegroups.org/http/v2.json`;

  RGHeaders = new HttpHeaders({'Content-Type':'application/vnd.api+json',
                              'Authorization':`${Secret.RescueKey}`});

  constructor(private http: HttpClient) { }

  getPets(){
    this.http.get<any>(`${this.url}`, {headers: this.RGHeaders}).subscribe((results:any)=>{
      console.log(results);

    });
  }

}
