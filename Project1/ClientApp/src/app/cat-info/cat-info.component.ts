import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../favorite.service';
import { PetFinderService } from '../petfinder.service';
import { Animal } from '../PFAnimals';
import { PFSingle } from '../PFSingle';
import { RescueGroupsService } from '../rescue-groups.service';

@Component({
  selector: 'app-cat-info',
  templateUrl: './cat-info.component.html',
  styleUrls: ['./cat-info.component.css']
})
export class CatInfoComponent implements OnInit {
  catID:string = "-1";
  shelterID:string = "-1";
  catData:Animal = {} as Animal;

  private routeSub: Subscription;

  constructor(private favoriteAPI: FavoritesService,
              private PFservice:PetFinderService,
              private RGservice:RescueGroupsService,
              private route: ActivatedRoute) 
  { 
    console.log("constructed !");
    this.routeSub = route.params.subscribe(params => {
      this.shelterID = params['shelter'];
      this.catID = params['cat'];
    });
  }

  ngOnInit(): void {
    if(this.shelterID === "17"){
      this.PFservice.getSpecificPet(this.catID).subscribe((results:PFSingle)=>{
        this.catData = results.animal
      });
    }
    else if(this.shelterID === "-1"){
      // test
    } else {
      console.log("what api is this for?????")
    }
  }




}
