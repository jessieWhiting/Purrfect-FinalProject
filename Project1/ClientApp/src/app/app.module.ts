import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { FavoritesComponent } from './favorites/favorites.component';
import { Secret } from './secret';
import { PetFinderService } from './petfinder.service';
import { delay, interval } from 'rxjs';
import { CatInfoComponent } from './cat-info/cat-info.component';
import { AristocatsComponent } from './aristocats/aristocats.component';


export function initializeApp(PFServ:PetFinderService) {
  
  return () => {
    localStorage.clear();
    // let xFPt:number = localStorage.getItem("xFPt") === null? 0:parseInt(localStorage.getItem(`PetFinderToken`)!);
    if((localStorage.getItem("xFPt") === null)){
      // || (xFPt) > (xFPt-60)
      // console.log(`current: ${Date.now} old: ${xFPt}`);
      // localStorage.setItem("xFPt", `${Date.now}`);
       PFServ.OnLoad();
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FavoritesComponent,
    UserProfileComponent,
    CatInfoComponent,
    AristocatsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home/:page', component: HomeComponent, pathMatch: 'prefix' },
      { path: 'user-profile', component: UserProfileComponent},
      { path: 'favorites', component: FavoritesComponent},
      { path: 'cat-info/:shelter/:cat', component: CatInfoComponent},
      { path: 'aristocats', component: AristocatsComponent},
    ]),
    AppRoutingModule,
    CommonModule,
    SocialLoginModule,
  ],
  providers: [{
  	provide: 'SocialAuthServiceConfig',
  	useValue: {
    	autoLogin: false,
    	providers: [
      	{
        	id: GoogleLoginProvider.PROVIDER_ID,
        	provider: new GoogleLoginProvider(
          	Secret.GoogleKey
        	)
      	}
    	]
  	} as SocialAuthServiceConfig,
	},
  {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [PetFinderService],
    useFactory: initializeApp,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
