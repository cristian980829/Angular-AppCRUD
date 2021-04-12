import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular material 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSortModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSortModule
  ]
})
export class MaterialModule { }
