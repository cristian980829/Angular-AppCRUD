import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal/modal.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from 'src/app/material.module';
import { RatingModule } from 'ng-starrating';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeroesModule } from 'src/app/components/heroes/heroes.module';
import { SaveHeroDialogCardComponent } from './save-hero-dialog-card/save-hero-dialog-card.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    TableComponent,
    SaveHeroDialogCardComponent
  ],
  exports:[
    ToolbarComponent,
    TableComponent,
    SaveHeroDialogCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RatingModule,
    ReactiveFormsModule,
    RouterModule
    // HeroesModule
  ]
})
export class ComponentsModule { }
