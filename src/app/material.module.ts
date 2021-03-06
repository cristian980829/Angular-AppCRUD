import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular material 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';


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
    MatListModule,
    MatDialogModule,
    MatRadioModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule
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
