import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PFToken } from './PFToken';
import { Secret } from './secret';


@Injectable({
  providedIn: 'root'
})
export class PetfinderService {

  constructor(private http: HttpClient) { }
  url:string = `https://api.petfinder.com/v2`;

  getToken():Observable<PFToken>{
    let keyString:string = `grant_type=client_credentials&client_id=${Secret.PFPublicKey}&client_secret=${Secret.PFSecretKey}`;
    return this.http.post<PFToken>(`${this.url}+/oauth2/token`, keyString);
  }

  diff_hours(dt2:Date, dt1:Date):number {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  isTokenExpired():boolean{
    
    let PetFinderToken:string = localStorage.getItem("PetFinderToken") === null? "":localStorage.getItem(`PetFinderToken`)!;

    if(PetFinderToken !== ""){
      // see if there is a token + check the date 
      let tokenArray:string[] = PetFinderToken.split(", ");
      console.log(tokenArray);
      let tokenObj:PFToken = {token_type: tokenArray[0],
                              expires_in: parseInt(tokenArray[1]),
                              access_token: tokenArray[2],
                              date_created: new Date(tokenArray[3])
                              };
      let currentDate = new Date()

      if(this.diff_hours(currentDate, tokenObj.date_created) > 0){
        console.log("our token is old !");
        localStorage.clear();
        return true;
      }
      else {
        // token exists and is NOT old
        return false;
      }
    }
    // token doesnt exist, we need one
    return true;
  }


  getPets(){
    // if a token exists in local storage and is valid, 
    if(this.isTokenExpired()){
    this.getToken().subscribe((results:PFToken)=>{
      let tokenParams:string = `${results.token_type}, ${results.expires_in}, ${results.access_token}, ${results.date_created}`;
      localStorage.setItem("PetFinderToken", tokenParams);
      //take this log out laterrrr
      console.log(results.access_token);
      //this.http.get(`${this.url}/animals`).subscribe((results:)=>{

      //})
      
      // write to local storage
    });
    } else{
     // we have a token and we need to use it 
    }
  }

}
