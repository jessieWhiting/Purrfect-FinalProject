import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BreedsByFDA } from './BreedsByFDA';

@Injectable({
  providedIn: 'root'
})
export class FDADrugService {

  constructor(private http: HttpClient) { 
  
  }
  testing(){
    let url:string = `https://api.fda.gov/animalandveterinary/event.json?search=animal.species:%22Cat%22&count=animal.breed.breed_component.exact`;
    this.http.get<BreedsByFDA>(url).subscribe((result:BreedsByFDA)=>{
      console.log(`there are ${result.results[0].count} ${result.results[0].term}s`)
    });
  }
}
