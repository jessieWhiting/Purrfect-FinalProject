import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PFToken } from './PFToken';
import { Secret } from './secret';


@Injectable({
  providedIn: 'root'
})
export class PetFinderService {

  constructor(private http: HttpClient) { }
  url:string = `https://api.petfinder.com/v2/`;
  getToken(){
    const getTokenHeaders = new HttpHeaders();
  //  let keyString:string = `grant_type=client_credentials&client_id=JdFhi7bzFoX2pqnV8S04ZYzpaKjfrtkmJW6wGBOTBQU8jmltBZ&client_secret=VZgZ7jwW7UH3VHmD7dq4COx8FeBgqWZz8H2iRPdE`;
    getTokenHeaders.append('access-control-allow-origin', '*');
    getTokenHeaders.append('content-type', 'application/x-www-form-urlencoded');
    getTokenHeaders.append('grant_type', 'client_credentials');
    getTokenHeaders.append('Accept', 'application/json');
    getTokenHeaders.append("grant_type", "client_credentials");
    getTokenHeaders.append("client_id", "JdFhi7bzFoX2pqnV8S04ZYzpaKjfrtkmJW6wGBOTBQU8jmltBZ");
    getTokenHeaders.append("client_secret","VZgZ7jwW7UH3VHmD7dq4COx8FeBgqWZz8H2iRPdE");
    //console.log(keyString);
    return this.http.post<any>(`https://api.petfinder.com/v2/oauth2/token`, {headers: getTokenHeaders});
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
        console.log("our token is expired!");
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
