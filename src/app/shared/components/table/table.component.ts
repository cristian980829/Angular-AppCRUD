import { Component, OnInit, ViewChild } from '@angular/core';

import { HeroeModel } from '../../models/heroe.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { HeroesService } from '../../../components/heroes/services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dataSource= new MatTableDataSource<HeroeModel>([]);
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  cargando=false;
  columnas: string[] = ['Numero','Nombre', 'Estado', 'Universo', 'Tools'];
    
  constructor( private heroService: HeroesService,
                      public dialog: MatDialog ) { }

  ngOnInit(): void {
    // this.cargando=true
    this.heroService.getAllHeroes().subscribe(resp=>{
      // this.cargando=false;
      this.dataSource.data = resp;
      console.log(this.dataSource.data);
    });
  }

    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


 applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteHeroe(heroe,i){

  }

  onNewPost() {
    this.openDialog();
  }

  openDialog(post?: HeroeModel): void {
    const config = {
      data: {
        message: post ? 'Editar heroe' : 'Nuevo heroe',
        content: post
      }
    };

    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if(!result || result===true){
        return;
      }
      console.log(`Dialog result ${result}`);
    }, (err)=>{
        console.log(`El error es: ${catchError}`);
    });
  }

}