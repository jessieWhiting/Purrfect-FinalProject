import { Component } from '@angular/core';
import { FDADrugService } from '../fdadrug.service';
import { PetfinderService } from '../petfinder.service';
import { Animal } from '../PFAnimals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  petsToShow:Animal[] = [];

  constructor(private fdadrug:FDADrugService,
              private PFService:PetfinderService,){
    
    fdadrug.testing();

    this.petsToShow = PFService.getPets(2).animals;



  }


}
