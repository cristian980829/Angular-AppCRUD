import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material.module';
import { RatingModule } from 'ng-starrating';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PaginatePipe } from '../../../pipes/paginate.pipe';


@NgModule({
  declarations: [HomeComponent, PaginatePipe ],
  imports: [
    CommonModule, 
    HomeRoutingModule, 
    MaterialModule,
    RatingModule,
    NgbModule
  ]
})
export class HomeModule { }
