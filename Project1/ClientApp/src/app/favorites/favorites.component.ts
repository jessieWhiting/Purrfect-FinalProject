import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Favorite } from '../favorite';
import { FavoritesService } from '../favorite.service';
import { PetFinderService } from '../petfinder.service';
import { Animal, PFAPI } from '../PFAnimals';
import { UsersService } from '../users.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { PFSingle } from '../PFSingle';
import { BasicCatInfo } from '../basicCatInfo';
import { CatService } from '../cat.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favPet: Favorite[] = []; // list of favorite objects
  favPets: Animal[] = []; // the cats we are going to display that we got from the list
  deletedCounter:number = 0;

  currentUser: User = {} as User;
  user: SocialUser = {} as SocialUser;//Gets googleID.
  loggedIn: boolean = false;//Checks for logged in user.

  constructor(private pfAPI: PetFinderService, private favoriteAPI: FavoritesService, private _ActivatedRoute: ActivatedRoute, 
    private userAPI: UsersService, private authService: SocialAuthService, private basicCatInfo: CatService) 
  { 
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
      // console.log(this.user);

      // after google login, get our data on user
      this.userAPI.getUserById(this.user.id).subscribe((result : User) => 
      {
        console.log(result);
        this.loggedIn = true;
        this.currentUser = result;
        // then get the favorites this user has
        this.favoriteAPI.CurrentUserFavoritesById(this.currentUser.userId).subscribe((results: Favorite[]) =>
        {
          this.favPet = results;
          this.favPet.forEach(f => {
            // true should be a shelter id maybe? should that be in favorites or should we be checking against the cats table? cause im not sure how to acheive that...
            if(true){
              this.pfAPI.getSpecificPet(f.catId.toString()).subscribe((results:PFSingle) => {
                if(results.animal.age === "deleted")
                {
                  this.deletedCounter++;
                } else{
                  this.favPets.push(results.animal);
                }
              });
            }
          });
        });
      });
    });
  }

  ngOnInit(): void {

  }

  favPetsCostFinder(id:number):string{
    let output:string = "";
    let count:number = 1;
    let catToParse:Animal = this.favPets.find(f => f.id === id)!;
    if(!catToParse.attributes.shots_current){
      count += .5;
    }
    if(!catToParse.attributes.spayed_neutered){
      count += 1;
    }
    if(catToParse.attributes.special_needs){
      count += .5;
    }
    if(catToParse.size === "Large"){
      count += .5;
    }
    if(catToParse.species === "idk yet lol"){
      // would like to do something with breed costs here and hopefully insurance !!
    }
    
    // convert our value to display 
    for(let i = 0; i < Math.round(count) ; i++){
      output = output.concat("$");
    }
    return output;
  }

  //Add a favorited pet from user's saved favorites
  AddFavoritePet(id: number): void {
    let newFavorite : Favorite = {} as Favorite;
    let newCat : BasicCatInfo = {} as BasicCatInfo;
    newCat.petId = id;
    newCat.shelterId = 17;
    newFavorite.catId = id;
    newFavorite.userId = this.currentUser.userId;
  
    this.basicCatInfo.AddNewCat(newCat).subscribe((result:BasicCatInfo) =>
    {
      console.log(result);
      let identifiedPet : boolean = true;
      // check to see if this pet is in the users favorites, if not, we goto remove the cat
      this.favPets.forEach(pet => 
      {
        if(pet.id === id)
        {
          identifiedPet = false;
        }
      });
      if(identifiedPet === true)
      {
        this.favoriteAPI.AddFavoritePet(newFavorite).subscribe((result: Favorite)=>
        {       
          console.log("AddFavoritePet: "+result);
          document.getElementById(`fav${id}`);     
        });
      }
      else
      {
        this.RemoveFavoritePet(id);
      }
    });  
  }

  //Delete a favorited pet from user's saved favorites
  RemoveFavoritePet(id: number): void{
    let indexToDelete = -1;
    this.favPet.forEach( f =>
    {
      if((f.catId === id ) )
      //&& (f.userId === this.currentUser.userId)
      {
        indexToDelete = f.favoriteId;
      }
    });
    this.favoriteAPI.RemoveFavoritePet(indexToDelete).subscribe((result: any) => 
    {
      var element = document.getElementById(`div${id}`)!;
      element.parentNode?.removeChild(element);
    });
  }
 
  SaveNote(noteElementID:string, id:number)
  {
    // Works as adding a note AND saves to the DB.
    // get fav object and add new string then put in param  
    let toChange:Favorite = {} as Favorite;
    this.favPet.forEach(fav => {
      if((fav.catId === id)  && (fav.userId === this.currentUser.userId)){
        toChange = fav;
      }
    });
    let textBox:string = (document.getElementById(`note${id}`) as HTMLTextAreaElement).value;
    toChange.note = textBox;
    this.favoriteAPI.ChangeNote(toChange).subscribe(() => {
      var textBox = document.getElementById(`alert${id}`)!;
      textBox.innerHTML = `changed!`;
    });
  }
    // Displays previously generated notes.
  GetNote(id : number): string
  {
    return this.favPet.find(fav => (fav.catId === id)  && (fav.userId === this.currentUser.userId))?.note!;
  }
}
