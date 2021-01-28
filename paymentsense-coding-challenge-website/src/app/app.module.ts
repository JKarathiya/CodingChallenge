import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountriesService, PaymentsenseCodingChallengeApiService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountriesComponent, CountryDetailComponent } from './components';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    CountryDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule
  ],
  providers: [CountriesService, PaymentsenseCodingChallengeApiService],
  bootstrap: [AppComponent],
  entryComponents: [
    CountryDetailComponent
  ]
})
export class AppModule { }
