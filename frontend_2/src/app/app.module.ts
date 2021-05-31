import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import { AppComponent } from './app.component';
import {ScoreComponent} from './score/score.component';
import {appRoutes} from './app.routes';
import {UsersEndpoints} from '../endpoints/users.endpoints';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    ScoreComponent,
  ],
  providers: [
    UsersEndpoints,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
