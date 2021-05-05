import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material.module';
import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [HomeComponent ],
  imports: [
    CommonModule, 
    HomeRoutingModule, 
    MaterialModule,
    RatingModule
  ]
})
export class HomeModule { }
