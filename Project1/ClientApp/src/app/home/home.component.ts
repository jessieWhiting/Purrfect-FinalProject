import { Component } from '@angular/core';
import { FDADrugService } from '../fdadrug.service';
import { PetFinderService } from '../petfinder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private fdadrug:FDADrugService, private PFservice:PetFinderService){
    fdadrug.testing();
    PFservice.getPets();
  }
}
