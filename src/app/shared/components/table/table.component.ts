import { Component, OnInit, ViewChild } from '@angular/core';

import { HeroeModel } from '../../models/heroe.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dataSource= new MatTableDataSource<HeroeModel>([]);
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  cargando=false;
  columnas: string[] = ['Numero','Nombre', 'Estado', 'Universo', 'Poder', 'Tools'];
  heroes:HeroeModel[]=[
    {
      name:'Iron man',
      status:'Muerto',
      universe:'Marvel',
      powers:['Volar','Dinero']
    },{
      name:'Super man',
      status:'Vivo',
      universe:'DC',
      powers:['Volar','Fuerza']
    },{
      name:'Hulk',
      status:'Vivo',
      universe:'Marvel',
      powers:['Fuerza','Inteligencia']
    },
  ];

    
  constructor() { }

  ngOnInit(): void {
    // this.cargando=true
    // this.heroesService.getAllHeroes().subscribe(resp=>{
    //   this.cargando=false;
    //   this.dataSource.data = resp;
    //   console.log(this.dataSource.data);
    // });
    this.dataSource.data = this.heroes;
  }

    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


 applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteHeroe(heroe,i){

  }

}
