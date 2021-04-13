import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { HeroListComponent } from './hero-list.component';
import { HeroListRoutingModule } from './hero-routing.module';
import { TableComponent } from '../../../shared/components/table/table.component';


@NgModule({
  declarations: [HeroListComponent, TableComponent ],
  imports: [CommonModule, HeroListRoutingModule, MaterialModule]
})
export class HeroListModule { }


