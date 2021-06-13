import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MaterialModule } from 'src/app/material.module';
import { RatingModule } from 'ng-starrating';
import { PaginatePipe } from 'src/app/pipes/paginate.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PaginatePipe
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    RatingModule,
    NgbModule
  ]
})
export class PagesModule { }
