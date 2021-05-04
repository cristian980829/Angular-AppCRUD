import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { HeroListComponent } from './hero-list.component';
import { HeroListRoutingModule } from './hero-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';



@NgModule({
  declarations: [HeroListComponent ],
  imports: [
    CommonModule, 
    HeroListRoutingModule, 
    MaterialModule, 
    ComponentsModule]
})
export class HeroListModule { }


