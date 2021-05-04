import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { NewHeroComponent } from './new-hero/new-hero.component';
import { HeroComponent } from './hero/hero.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [
    EditHeroComponent,
    NewHeroComponent,
    HeroComponent

  ],
  exports:[
    EditHeroComponent,
    NewHeroComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RatingModule,
    RouterModule,
    ComponentsModule,
  ]
})
export class HeroesModule { }
