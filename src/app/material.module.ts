import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular material 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


const myModule = [
  CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule, 
    MatSidenavModule, 
    MatListModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    myModule
  ],
  exports: [
    myModule
  ]
})
export class MaterialModule { }
