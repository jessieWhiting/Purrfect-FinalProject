import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,

  ],
  imports: [
    BrowserModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
     
    ]),
    AppRoutingModule,

    CommonModule,

    SocialLoginModule

  ],
  providers: [{
  	provide: 'SocialAuthServiceConfig',
  	useValue: {
    	autoLogin: false,
    	providers: [
      	{
        	id: GoogleLoginProvider.PROVIDER_ID,
        	provider: new GoogleLoginProvider(
          	'clientId'
        	)
      	}
    	]
  	} as SocialAuthServiceConfig,
	}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
