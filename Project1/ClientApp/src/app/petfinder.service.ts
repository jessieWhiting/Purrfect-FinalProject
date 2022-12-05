import { HttpClient, HttpHeaders } from '@angular/common/http';
import { outputAst } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PFAPI } from './PFAnimals';
import { PFToken } from './PFToken';
import { Secret } from './secret';


@Injectable({
  providedIn: 'root'
})
export class PetFinderService {
  url:string;
  constructor(private http: HttpClient, @Inject("BASE_URL") private base:string) {
    this.url = base;
  }

  // url:string = `https://api.petfinder.com/v2`;

  getToken():Observable<PFToken>{
    const getTokenHeaders = new HttpHeaders();

    const keyString:FormData = new FormData();
    keyString.append("grant_type", "client_credentials");
    keyString.append("client_id", `${Secret.PFPublicKey}`);
    keyString.append("client_secret", `${Secret.PFSecretKey}`);

    getTokenHeaders.set('Access-Control-Allow-Origin', '*');
    getTokenHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    getTokenHeaders.append('Accept', '*/*');
    getTokenHeaders.append('Accept-Encoding', 'gzip, deflate, br');
    getTokenHeaders.append('Connection', 'keep-alive');
    getTokenHeaders.append('Access-Control-Allow-Credentials', 'true');
    return this.http.post<PFToken>(`https://api.petfinder.com/v2/oauth2/token`, keyString, {headers: getTokenHeaders});

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


  getPets(page:number):Observable<PFAPI>{
    let output:PFAPI = {} as PFAPI;

    // if a token exists in local storage and is valid,
    if(this.isTokenExpired()){
    
    this.getToken().subscribe((results:PFToken)=>{
      let tokenParams:string = `${results.token_type}, ${results.expires_in}, ${results.access_token}, ${Date.now()}`;
      localStorage.setItem("PetFinderToken", tokenParams);
      // write new token to local storage
      console.log("we got a new token!");
      return this.http.get<PFAPI>(`${this.url}pf/newToken/list/${page}/${results.access_token}`,);
    });
    } else{
      console.log("we are using our token!")

      let token:string = localStorage.getItem("PetFinderToken")!;

      let tokenArray:string[] = token.split(", ");
      let tokenObj:PFToken = {token_type: tokenArray[0],
                              expires_in: parseInt(tokenArray[1]),
                              access_token: tokenArray[2],
                              date_created: new Date(tokenArray[3])
                              };

      return this.http.get<PFAPI>(`${this.url}pf/list/${page}`);
    }
    // last catch ?
    return this.http.get<PFAPI>(`${this.url}pf/list/${page}`);
  }

  // get a pet with an id
  getSpecificPet(id:string){
    // if a token exists in local storage and is valid, 
    
    if(this.isTokenExpired()){
    this.getToken().subscribe((results:PFToken)=>{
      let tokenParams:string = `${results.token_type}, ${results.expires_in}, ${results.access_token}, ${results.date_created}`;
      localStorage.setItem("PetFinderToken", tokenParams);
      //take this log out laterrrr
      console.log(results.access_token);
      //const tokenHeader = new HttpHeaders();
      //tokenHeader.append('Authorization', `Bearer ${results.access_token}`);
      //this.http.get(`${this.url}/animals/${id}`, tokenHeader).subscribe((results:)=>{

      //})
      
      // write to local storage
    });
    } else{
     // we have a token and we need to use it 
    }
  }

}
